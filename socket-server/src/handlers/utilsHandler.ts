import type { Socket } from "socket.io";

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


