import Joi from "joi";
import type { Io, IoSocket } from "../index.js";
import Client from "../components/client/client.js";
import InstanceManager from "../game/instance/instanceManager.js";

function registerChatHandler(io: Io, socket: IoSocket, client: Client) {
  const createInstance = () => {
    const instance = InstanceManager.createInstance();
    instance.join(client);

    // TODO: join each client in a lobby if it exists
    const room = `instance:${instance.id}`;

    // have each client in the instance subscribe to the instance socket room
    for (const client of instance.clients) {
      client.socket.join(room);
    }
  };

  socket.on("instance:create", createInstance);
}

export default registerChatHandler;
