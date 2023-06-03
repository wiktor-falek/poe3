import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { ObjectId } from "mongodb";

const LOBBY_MAX_SIZE = 4;

class Lobby {
  id: string;
  members: { [lobbyId: string]: Client };
  name: string;
  constructor(name: string) {
    this.id = nanoid();
    this.members = {};
    this.name = name;
  }

  join(client: Client) {
    if (this.size === LOBBY_MAX_SIZE) {
      return false;
    }
    this.members[client.character._id.toString()] = client;
    return true;
  }

  get size(): number {
    return Object.keys(this.members).length;
  }
}

export default Lobby;
