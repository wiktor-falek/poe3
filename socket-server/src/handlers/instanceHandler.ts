import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";

function registerInstanceHandler(
  io: any,
  socket: Socket,
  client: Client
): void {
  const joinInstance = (zoneId: number) => {
    logger.info(
      `created instance for ${client.username} with zoneId=${zoneId}`
    );
  };

  socket.on("instance:join", joinInstance);
}

export default registerInstanceHandler;
