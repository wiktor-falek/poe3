import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import CombatRoom from "../logic/Room";
function registerCombatHandler(io: any, socket: Socket, client: Client): void {
  const getCombatData = () => {
    const room = client.instance?.currentRoom;
    if (!room) return socket.emit("error", "Room does not exist");
    if (!("combat" in room)) {
      return socket.emit("error", "Room is not a combat room");
    }
    if (room.combat) {
      return socket.emit("combat:data", room.combat);
    }

    const combat = room.combat;
  };

  socket.on("combat:get-data", getCombatData);
}

export default registerCombatHandler;
