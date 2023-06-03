import { nanoid } from "nanoid";
import { IoSocket } from "../../index.js";
import Client from "../../components/client/client.js";

const LOBBY_MAX_SIZE = 4;

class Lobby {
  id: string;
  members: Map<string, Client>; // characterId
  name: string;
  constructor(name: string) {
    this.id = nanoid();
    this.members = new Map();
    this.name = name;
  }

  join() {
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
