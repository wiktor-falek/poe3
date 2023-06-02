import { nanoid } from "nanoid";
import { IoSocket } from "../../index.js";

const LOBBY_MAX_SIZE = 4;

class Lobby {
  id: string;
  members: Map<string, IoSocket>; // characterId
  constructor() {
    this.id = nanoid();
    this.members = new Map();
  }

  join(socket: IoSocket) {
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
