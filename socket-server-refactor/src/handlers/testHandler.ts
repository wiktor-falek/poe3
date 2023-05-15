import { Io, Socket } from "../.."; // io and socket with defined events (documentation doesn't cover this)

function registerTestHandler(io: Io, socket: Socket) {
  function hello() {
    socket.emit("basicEmit", 1, "b", Buffer.from([1, 2, 3]));
  }

  socket.on("hello", hello)
}

export default registerTestHandler;
