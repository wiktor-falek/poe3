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
import LobbyManager from "./game/lobby/lobbyManager.js";
import registerInstanceHandler from "./handlers/instanceHandler.js";
import InstanceManager from "./game/instance/instanceManager.js";

await Mongo.connect();

interface SocketData {
  isAuthenticated: boolean;
  client: Client;
}

const httpServer = createServer();
const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
  httpServer,
  {
    transports: ["websocket", "polling"],
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  }
);

// global middlewares
io.use(initialize);

io.on("connection", socket => {
  // TypeScript doesn't know that this connection does not happen
  // unless socket.data.client is defined in initialize middleware,
  // since SocketData is wrapped in Partial<>
  assert(socket.data.client);

  const { client } = socket.data;
  client.setConnected();

  socket.on("error", err => {
    // socket.emit("connectionError");
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  registerChatHandler(io, socket, client);
  registerLobbyHandler(io, socket, client);
  registerInstanceHandler(io, socket, client);

  console.log(`${client.characterName} (${client.username}) connected`);

  socket.on("disconnect", (reason, description) => {
    client.setDisconnected();

    // handle disconnect

    // TODO: make this dry if possible
    const lobby = LobbyManager.currentLobby(client);
    if (lobby !== undefined) {
      lobby.leave(client);
      io.to(`lobby:${lobby.id}`).emit("lobby:data", lobby.membersOnlyData);
      lobby.id;
      if (lobby.size === 0) {
        LobbyManager.deleteLobby(lobby.id);
      }
    }

    console.log(`${client.characterName} (${client.username}) disconnected (${reason})`);
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
