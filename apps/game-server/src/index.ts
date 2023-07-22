import { createServer } from "http";
import { Server } from "socket.io";
import initialize from "./middlewares/initialize.js";
import registerChatHandler from "./handlers/chatHandler.js";
import registerLobbyHandler from "./handlers/lobbyHandler.js";
import LobbyManager from "./components/lobby/lobbyManager.js";
import registerInstanceHandler from "./handlers/instanceHandler.js";
import InstanceManager from "./game/instance/instanceManager.js";
import { PartyMessage } from "./components/message.js";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
} from "../types/socket.js";

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
  const { client } = socket.data;
  client.setConnected();

  socket.on("error", (err) => {
    // socket.emit("connectionError");
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  registerChatHandler(io, socket, client);
  registerLobbyHandler(io, socket, client);
  registerInstanceHandler(io, socket, client);

  console.log(`${client.character.name} (${client.username}) connected`);

  const instance = InstanceManager.currentInstance(client);
  if (instance !== null) {
    socket
      .to(instance.socketRoom)
      .emit(
        "chat:message",
        new PartyMessage(`${client.character.name} has reconnected`)
      );
  }

  socket.on("disconnect", (reason, description) => {
    client.setDisconnected();

    const lobby = LobbyManager.currentLobby(client);
    if (lobby) {
      lobby.leave(client);
      io.to(lobby.socketRoom).emit("lobby:data", lobby.membersOnlyData);
    }

    const instance = InstanceManager.currentInstance(client);
    if (instance) {
      io.to(instance.socketRoom).emit(
        "chat:message",
        new PartyMessage(`${client.character.name} has disconnected`)
      );
    }

    console.log(
      `${client.username} (${client.character.name}) disconnected (${reason})`
    );
  });
});

httpServer.listen(4000, () => {
  console.log("http://localhost:4000");
});
