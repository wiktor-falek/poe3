import { createServer } from "http";
import { Namespace, Server } from "socket.io";
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

io.use(authenticate);

const chat: Namespace<
  ChatClientToServerEvents,
  ChatServerToClientEvents,
  ChatInterServerEvents,
  ChatSocketData
> = io.of("/chat");


chat.on("connection", (socket) => {
  socket.emit("message", new SystemMessage("Connected to chat"));
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
