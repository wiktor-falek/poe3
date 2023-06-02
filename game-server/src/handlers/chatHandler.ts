import Joi from "joi";
import type { Io, IoSocket } from "../index.js";
import { GlobalMessage, ServerMessage } from "../components/message.js";
import Client from "../components/client/client.js";

function registerChatHandler(io: Io, socket: IoSocket, client: Client) {
  const join = (_room: number) => {
    const schema = Joi.number().required().min(1).max(1000);
    const result = schema.validate(_room);
    if (result.error) {
      return socket.emit(
        "message",
        new ServerMessage("Invalid argument 'room'")
      );
    }

    const room = result.value;

    const roomName = `global:${room}`;

    socket.join(roomName);
    socket.emit("message", new ServerMessage(`You joined global room ${room}`));
  };

  const send = (_message: string) => {
    const schema = Joi.string().required().min(1).max(128);
    const result = schema.validate(_message);

    if (result.error) {
      return socket.emit(
        "message",
        new ServerMessage("Invalid argument 'message'")
      );
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

    io.to(roomName).emit(
      "message",
      new GlobalMessage(message, client.characterName)
    );
  };

  socket.on("join", join);
  socket.on("send", send);
}

export default registerChatHandler;
