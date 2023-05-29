import Joi from "joi";
import type { ChatNamespace, ChatSocket } from "../index.js";
import { GlobalMessage, ServerMessage } from "../components/message.js";

function registerChatHandler(io: ChatNamespace, socket: ChatSocket) {
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
    console.log(_message);
    const schema = Joi.string().required().min(1).max(128);
    const result = schema.validate(_message);
    console.log(result);
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

    io.to(roomName).emit("message", new GlobalMessage(message));
  };

  socket.on("join", join);
  socket.on("send", send);
}

export default registerChatHandler;
