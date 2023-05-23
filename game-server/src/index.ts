import { createServer } from "http";
import { Namespace, Server, Socket } from "socket.io";
import { SystemMessage } from "./message";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  ChatSocketData,
} from "../../common/events/gameServerEvents";
import authenticate from "./middlewares/authenticate";
import registerChatHandler from "./handlers/chatHandler";

const httpServer = createServer();
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT"],
  },
});

// global middlewares
io.on("new_namespace", (namespace) => {
  namespace.use(authenticate);
});

const chat: Namespace<
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  ChatSocketData
> = io.of("/chat");

chat.on("connection", (socket) => {
  console.log("user connected to chat");
  socket.on("error", (err) => {
    console.log(err);
    socket.disconnect();
  })
  // socket.emit("message", new SystemMessage("Connected to chat"));

  registerChatHandler(chat, socket);
});
// io.on("connection", (socket) => {
//   // handle errors

//   // init

//   // register handlers
//   registerTestHandler(io, socket);

//   socket.on("disconnect", () => {});
// });

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
