import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import logger from "../logger";

function registerUtilsHandler(
  io: any,
  socket: Socket,
): void {
  const ping = (callback: Function) => {
    callback();
  }

  socket.on("utils:ping", ping);
}

export default registerUtilsHandler;


