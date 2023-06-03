import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { ObjectId } from "mongodb";

const LOBBY_MAX_SIZE = 4;

type CharacterId = ObjectId;

class Lobby {
  id: string;
  members: Map<CharacterId, Client>;
  name: string;
  constructor(name: string) {
    this.id = nanoid();
    this.members = new Map();
    this.name = name;
  }

  join(client: Client) {
    if (this.size === LOBBY_MAX_SIZE) {
      return false;
    }
    this.members.set(client.character._id, client);
    return true;
  }

  get size(): number {
    return this.members.size;
  }
}

export default Lobby;
