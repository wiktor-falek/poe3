import type { Io, IoSocket } from "../index.js";
import Client from "../components/client/client.js";
import InstanceManager from "../game/instance/instanceManager.js";
import LobbyManager from "../game/lobby/lobbyManager.js";
import { GlobalMessage, PartyMessage } from "../components/message.js";

function registerInstanceHandler(io: Io, socket: IoSocket, client: Client) {
  const create = () => {
    // if lobby exists prevent non-owner from creating a lobby
    const lobby = LobbyManager.currentLobby(client);

    if (lobby && !lobby.clientIsOwner(client)) {
      return;
    }

    if (lobby) {
      lobby.isHidden = true;
    }

    // initialize instance
    const instance = InstanceManager.createInstance();

    const clients = lobby === undefined ? [client] : [...lobby.clients];
    // handle instance join for each client
    for (const client of clients) {
      instance.join(client);
      client.instanceId = instance.id;
      client.socket.join(instance.socketRoom);
    }

    // temporarily init combat before everything is ready
    instance.createCombatRoom();

    io.to(instance.socketRoom).emit("instance:set", instance);
  };

  const leave = () => {
    const instance = InstanceManager.currentInstance(client);
    if (instance === undefined) {
      // TODO: emit error
      return;
    }

    instance.leave(client);
    client.instanceId = null;

    if (Object.keys(instance).length === 0) {
      // all clients left
      InstanceManager.deleteInstance(instance);
    }

    socket.emit("instance:set", null);

    socket.leave(instance.socketRoom);
    io.to(instance.socketRoom).emit(
      "chat:message",
      new GlobalMessage(`${client.characterName} has left the instance`, "SYSTEM")
    );
  };

  const selectRoom = () => {
    // make sure client is the instance owner
  };

  socket.on("instance:create", create);
  socket.on("instance:leave", leave);
}

export default registerInstanceHandler;
