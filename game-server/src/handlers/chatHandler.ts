import Joi from "joi";
import type { ChatNamespace, ChatSocket } from "..";
import { ServerMessage } from "../components/message";

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

  socket.on("join", join);
}

export default registerChatHandler;