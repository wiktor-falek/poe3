import { createServer } from "http";
import { Namespace, Server, Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  GameClientToServerEvents,
  GameServerToClientEvents,
  GameInterServerEvents,
} from "../../common/events/gameServerEvents.js";
import authenticate from "./middlewares/authenticate.js";
import registerChatHandler from "./handlers/chatHandler.js";
import Mongo from "./db/mongo.js";
import isAuthenticated from "./middlewares/isAuthenticated.js";

await Mongo.connect();

const httpServer = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  transports: ["websocket", "polling"],
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// global middlewares
io.use(authenticate);
io.on("new_namespace", (namespace) => {
  namespace.use(isAuthenticated);
});

// namespaces
const chat: Namespace<
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  SocketData
> = io.of("/chat");

const game: Namespace<
  GameClientToServerEvents,
  GameServerToClientEvents,
  GameInterServerEvents,
  SocketData
> = io.of("/game");



// connections
chat.on("connection", (socket) => {
  console.log("user connected to chat");

  registerChatHandler(chat, socket);
});

game.on("connection", (socket) => {
  console.log("user connected to game");
  socket.on("error", (err) => {
    console.log(err);
    socket.disconnect();
  });
});

httpServer.listen(4000, () => {
  console.log("http://localhost:4000");
});

export type Io = typeof io;
export type ChatNamespace = typeof chat;
export type ChatSocket = Socket<
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  SocketData
>;
