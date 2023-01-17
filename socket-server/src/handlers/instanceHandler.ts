import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const joinInstance = (zoneId: number) => {
    const instance = client.joinInstance(zoneId);
    socket.emit("instance:data", instance.instanceData);
  };

  socket.on("instance:join", joinInstance);
}

export default registerInstanceHandler;
