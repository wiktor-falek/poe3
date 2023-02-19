import type { Socket } from "socket.io";
import type Client from "../helpers/Client";
import SystemMessage from "../utils/SystemMessage";

function validateRoomNumber(roomNumber: any): number | null {
  const MAX_ROOM = 999;

  if (typeof roomNumber !== "number") return null;
  if (roomNumber < 1 || roomNumber > MAX_ROOM) return null;
  return roomNumber;
}

function validateMessage(message: any): string | null {
  const MAX_LEN = 256;

  if (message === undefined || message === null) return null;
  if (typeof message !== "string") {
    return null;
  }
  const trimmedMessage = message.trim();
  if (trimmedMessage.length < 1 || trimmedMessage.length > MAX_LEN) {
    return null;
  }
  return message;
}

function registerChatHandler(io: any, socket: Socket, client: Client): void {
  const joinRoom = (roomNumber: number = 1) => {
    const validatedRoomNumber = validateRoomNumber(roomNumber);
    if (validatedRoomNumber === null) {
      socket.emit("error", "Room does not exist");
      return;
    }

    const roomName = `global:${validatedRoomNumber}`;

    // leave all global rooms, player can only be in one global room at once
    for (const room of [...socket.rooms]) {
      if (room.startsWith("global")) {
        console.log(`leaving room ${room}`);
        socket.leave(room);
      }
    }

    socket.join(roomName);

    socket.emit(
      "chat:message",
      new SystemMessage(`You joined Global ${validatedRoomNumber}`)
    );
  };

  const sendMessage = (message: string) => {
    let roomName = "";
    for (const room of socket.rooms.values()) {
      if (room.startsWith("global:")) {
        roomName = room;
      }
    }

    const content = message;
    const sender = client.characterModelProxy.character.name;
    io.to(roomName).emit("chat:message", { content, sender });
  };

  socket.on("chat:join", joinRoom);
  socket.on("chat:message", sendMessage);
}

export default registerChatHandler;
