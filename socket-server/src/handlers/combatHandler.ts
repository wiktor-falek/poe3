import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import { CombatRoom } from "../logic/Room";

function registerCombatHandler(io: any, socket: Socket, client: Client): void {
  const getCombatData = () => {
    const room = client.instance?.currentRoom;
    if (!room) return socket.emit("error");
    if (!(room instanceof CombatRoom)) {
      return socket.emit("error");
    }
    if (!room.initialized) return socket.emit("error");
    // room is a combat room, and is already initialized
  };

  socket.on("TODO:", getCombatData);
}

export default registerCombatHandler;
