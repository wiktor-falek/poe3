import type { Socket } from "socket.io";
import type Client from "../helpers/Client";

function registerChatHandler(io: any, socket: Socket, client: Client): void {
  const joinRoom = (roomNumber: number = 1) => {
    const roomName = `global:${roomNumber}`;
    /*
      TODO: validate input
      room must:
      - be a number
      - be within range of rooms
      - then be casted to a string
    */

    // TODO: leave every other global:n room
    // iterate through the keys of io.sockets.manager.roomClients[socket.id] and socket.leave those

    socket.join(roomName);

    socket.emit("chat:join", roomNumber);
  };

  const sendMessage = (message: string) => {
    // TODO: get current room
    const roomName = "global:1";
    // TODO: validation
    /*
      message must:
      - be a string
      - be trimmed
      - 0 < length < messageLengthLimit
    */
    const content = message;
    const sender = client.player.character.name;
    io.to(roomName).emit("chat:message", { content, sender });
  };

  socket.on("chat:join", joinRoom);
  socket.on("chat:message", sendMessage);
}

export default registerChatHandler;
