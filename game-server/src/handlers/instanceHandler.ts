import Joi from "joi";
import type { Io, IoSocket } from "../index.js";
import Client from "../components/client/client.js";
import InstanceManager from "../game/instance/instanceManager.js";
import LobbyManager from "../game/lobby/lobbyManager.js";

function registerInstanceHandler(io: Io, socket: IoSocket, client: Client) {
  const createInstance = () => {
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

  socket.on("instance:create", createInstance);
}

export default registerInstanceHandler;
