import type { ChatNamespace, ChatSocket } from "..";

function registerChatHandler(io: ChatNamespace, socket: ChatSocket) {
  const join = (room: number) => {
    console.log("someone joined chat");
  };

  socket.on("join", join);
}

export default registerChatHandler;
