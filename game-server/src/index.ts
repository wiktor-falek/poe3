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
  ChatSocketData,
  GameClientToServerEvents,
  GameServerToClientEvents,
  GameInterServerEvents,
  GameSocketData,
} from "../common/events/gameServerEvents";
import authenticate from "./middlewares/authenticate";
import registerChatHandler from "./handlers/chatHandler";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";

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
    methods: ["GET", "POST", "PUT"],
    credentials: true,
  },
});

// const pubClient = createClient({ url: "redis://localhost:6379" });
// const subClient = pubClient.duplicate();

// io.adapter(createAdapter(pubClient, subClient));

// global middlewares
io.on("new_namespace", (namespace) => {
  // TEMP: disable auth because server does not connect to mongodb in docker
  namespace.use(authenticate);
});

// namespaces
const chat: Namespace<
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  ChatSocketData
> = io.of("/chat");

const game: Namespace<
  GameClientToServerEvents,
  GameServerToClientEvents,
  GameInterServerEvents,
  GameSocketData
> = io.of("/game");

// connections
chat.on("connection", (socket) => {
  console.log("user connected to chat");
  socket.on("error", (err) => {
    console.log(err);
    socket.disconnect();
  });

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
  console.log("http://localhost:4000/");
});

export type Io = typeof io;
export type ChatNamespace = typeof chat;
export type ChatSocket = Socket<
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  ChatSocketData
>;
