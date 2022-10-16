import Player from "../entities/Player";
import Room from "../rooms/Room";

// interface Instance {
//   timestamp: number;
//   playerIsConnected: boolean;
//   zoneId: number;
// }

class Instance {
  timestamp: number;
  zoneId: number;
  rooms: Room[];
  player: Player | null;
  playerIsConnected: boolean;

  constructor(zoneId: number) {
    this.timestamp = Date.now();
    this.zoneId = zoneId;
    this.rooms = [new Room("Combat")];
    this.player = null;
    this.playerIsConnected = false;
  }

  playerJoin(player: Player) {
    this.player = player;
    this.playerIsConnected = true;
  }

  generateAllRooms() {
    // this.rooms = [new Room()]
  }
}

export default Instance;
