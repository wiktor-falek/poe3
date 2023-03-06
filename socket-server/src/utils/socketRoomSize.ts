import type { Server } from "socket.io";

export default async function socketRoomSize(io: Server, roomId: string) {
  const sockets = await io.of("/socket").in(roomId).fetchSockets();
  return sockets.length;
}
