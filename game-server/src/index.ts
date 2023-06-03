import { createServer } from "http";
import { Server } from "socket.io";
import initialize from "./middlewares/initialize.js";
import registerChatHandler from "./handlers/chatHandler.js";
import Mongo from "./db/mongo.js";
import type { Socket } from "socket.io";
import type {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
} from "../../common/events/gameServerEvents.js";
import type Client from "./components/client/client.js";
import assert from "./utils/assert.js";
import registerLobbyHandler from "./handlers/lobbyHandler.js";

await Mongo.connect();

interface SocketData {
  isAuthenticated: boolean;
  client: Client;
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
io.use(initialize);

io.on("connection", (socket) => {
  // TypeScript doesn't know that this connection does not happen
  // unless socket.data.client is defined in initialize middleware,
  // since SocketData is wrapped in Partial<>
  assert(socket.data.client);

  const { client } = socket.data;
  client.setConnected();

  socket.on("error", (err) => {
    // socket.emit("connectionError");
  });

  console.log(`${socket.data.client.characterName} connected`);

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  registerChatHandler(io, socket, client);
  registerLobbyHandler(io, socket, client);

  socket.on("disconnect", (reason, description) => {
    client.setDisconnected();
  });
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
