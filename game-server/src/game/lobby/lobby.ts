import { nanoid } from "nanoid";
import { GameSocket } from "../../index.js";

const LOBBY_MAX_SIZE = 4;

class Lobby {
  id: string;
  members: Map<string, GameSocket>; // characterId
  constructor() {
    this.id = nanoid();
    this.members = new Map();
  }

  join(socket: GameSocket) {
    if (this.size === LOBBY_MAX_SIZE) {
      return false;
    }
    // 
    // this.members.set("")
    return true;
  }

  get size(): number {
    return this.members.size;
  }
}

export default Lobby;
