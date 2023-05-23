import { IoWithEventTypes, SocketWithEventTypes } from "../..";

function registerTestHandler(
  io: IoWithEventTypes,
  socket: SocketWithEventTypes
) {
  function hello() {
    socket.emit("basicEmit", 1, "b", Buffer.from([1, 2, 3]));
  }

  socket.on("hello", hello);
}

export default registerTestHandler;
