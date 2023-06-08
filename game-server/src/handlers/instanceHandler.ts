import Joi from "joi";
import type { Io, IoSocket } from "../index.js";
import Client from "../components/client/client.js";
import InstanceManager from "../game/instance/instanceManager.js";
import LobbyManager from "../game/lobby/lobbyManager.js";
import { PartyMessage } from "../components/message.js";

function registerInstanceHandler(io: Io, socket: IoSocket, client: Client) {
  const create = () => {
    const instance = InstanceManager.createInstance();
    instance.join(client);
    client.instanceId = instance.id;

    // TODO: join each client in a lobby if it exists
    const room = `instance:${instance.id}`;

    const lobby = LobbyManager.currentLobby(client);

    if (lobby !== undefined) {
      for (const client of lobby.clients) {
        client.socket.join(room);
        client.instanceId = instance.id;
      }
    }

    // have each client in the instance subscribe to the instance socket room

    io.to(room).emit("instance:set", instance);
  };

  const leave = () => {
    const instance = InstanceManager.currentInstance(client);
    if (instance === undefined) {
      // TODO: emit error
      return;
    }

    instance.leave(client);
    client.instanceId = null;

    socket.emit("instance:set", null);

    const room = `instance:${instance.id}`;
    socket.leave(room);
    socket
      .to(room)
      .emit(
        "chat:message",
        new PartyMessage(`${client.characterName} has left the area`, "SYSTEM")
      );
  };

  socket.on("instance:create", create);
  socket.on("instance:leave", leave);
}

export default registerInstanceHandler;
