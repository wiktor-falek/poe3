import { createServer } from "http";
import { Namespace, Server } from "socket.io";
import type { Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
} from "../../common/events/gameServerEvents.js";
import authenticate from "./middlewares/authenticate.js";
import registerChatHandler from "./handlers/chatHandler.js";
import Mongo from "./db/mongo.js";

await Mongo.connect();

interface SocketData {
  isAuthenticated: boolean;
}

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

io.on("connection", (socket) => {
  socket.on("error", (err) => {
    // socket.emit("connectionError");
  });
  console.log("connection");
  registerChatHandler(io, socket);
});

httpServer.listen(4000, () => {
  console.log("http://localhost:4000");
});

export type Io = typeof io;
export type IoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
