import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { Err, Ok } from "resultat";

const LOBBY_MAX_SIZE = 4;

class Lobby {
  id: string;
  #members: { [characterId: string]: Client | undefined };
  name: string;
  size: number;
  constructor(name: string) {
    this.id = nanoid();
    this.#members = {};
    this.name = name;
    this.size = 0;
  }

  join(client: Client) {
    if (this.size === LOBBY_MAX_SIZE) {
      return Err("Lobby is full");
    }

    if (this.#members[client.character._id.toString()] !== undefined) {
      return Err("Already in the lobby");
    }

    this.#members[client.character._id.toString()] = client;
    this.size++;
    return Ok(1);
  }

  leave(client: Client) {
    const isInLobby =
      this.#members[client.character._id.toString()] !== undefined;

    if (!isInLobby) {
      return false;
    }
    delete this.#members[client.character._id.toString()];
    this.size--;
    return true;
  }
}

export default Lobby;
