import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { Err, Ok } from "resultat";
import { CharacterClass } from "../../../../common/types/index.js";
import { choice } from "pyrand";

export interface LobbyData {
  name: string;
  ownerName: string;
  id: string;
  size: number;
}

export interface MembersOnlyLobbyData extends LobbyData {
  members: Array<LobbyMember>;
}

export interface LobbyMember {
  name: string;
  class: CharacterClass;
  level: number;
}

const LOBBY_MAX_SIZE = 4;

class Lobby implements LobbyData {
  #clients: { [characterId: string]: Client };
  name: string;
  ownerName: string;
  id: string;
  size: number;
  constructor(name: string, ownerName: string) {
    this.#clients = {};
    this.name = name;
    this.ownerName = ownerName;
    this.id = nanoid();
    this.size = 0;
  }

  get membersOnlyData() {
    return { ...this, members: this.members };
  }

  get members(): Array<LobbyMember> {
    return Object.values(this.#clients).map((client) => {
      const character = client.character;
      return {
        name: character.name,
        class: character.class,
        level: character.level.value,
      };
    });
  }

  get clients(): Array<Client> {
    return Object.values(this.#clients);
  }

  clientIsInLobby(client: Client): boolean {
    const member = Object.values(this.#clients).find((member) =>
      member.character._id.equals(client.character._id)
    );
    return member !== undefined;
  }

  join(client: Client) {
    if (this.size === LOBBY_MAX_SIZE) {
      return Err("Lobby is full");
    }

    if (this.#clients[client.character._id.toString()] !== undefined) {
      return Err("Already in the lobby");
    }

    this.#clients[client.character._id.toString()] = client;
    this.size++;
    return Ok(1);
  }

  leave(client: Client) {
    const isInLobby =
      this.#clients[client.character._id.toString()] !== undefined;

    if (!isInLobby) {
      return false;
    }
    delete this.#clients[client.character._id.toString()];
    this.size--;

    if (this.size > 0) {
      // transfer ownership after leaving to a random client
      const randomClient = choice(Object.values(this.#clients));
      this.ownerName = randomClient.characterName;
    }

    return true;
  }

  kick(characterName: string): Client | undefined {
    const targetClient = Object.values(this.#clients).find(
      (client) => client.characterName === characterName
    );

    if (targetClient !== undefined) {
      delete this.#clients[targetClient.character._id.toString()];
      this.size--;
    }

    return targetClient;
  }
}

export default Lobby;
