import Joi from "joi";
import type { Io, IoSocket } from "../index.js";
import { GlobalMessage, ServerMessage } from "../components/message.js";
import Client from "../components/client/client.js";

function registerChatHandler(io: Io, socket: IoSocket, client: Client) {
  const join = (_roomId: number) => {
    const schema = Joi.number().required().min(1).max(1000);
    const result = schema.validate(_roomId);
    if (result.error) {
      return socket.emit("chat:message", new ServerMessage("Invalid argument 'room'"));
    }

    const roomId = result.value;

    const room = `global:${roomId}`;

    // leave other global rooms, because client is
    // allowed to only be in one global room at a time
    for (const room of socket.rooms) {
      if (room.startsWith("global:")) {
        socket.leave(room);
      }
    }
    socket.join(room);

    socket.emit("chat:message", new ServerMessage(`You joined global ${roomId}`));
  };

  const send = (_message: string) => {
    const schema = Joi.string().required().min(1).max(128);
    const result = schema.validate(_message);

    if (result.error) {
      return socket.emit("chat:message", new ServerMessage("Invalid argument 'message'"));
    }
    const message = result.value;

    let roomName = "";
    for (const room of socket.rooms.values()) {
      console.log(room);
      if (room.startsWith("global:")) {
        roomName = room;
        break;
      }
    }

    io.to(roomName).emit("chat:message", new GlobalMessage(message, client.characterName));
  };

  socket.on("chat:join", join);
  socket.on("chat:send", send);
}

export default registerChatHandler;
