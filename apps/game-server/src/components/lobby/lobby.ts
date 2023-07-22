import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { Err, Ok } from "resultat";
import { CharacterClass } from "@poe3/types";
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
  #isHidden: boolean;
  name: string;
  ownerName: string;
  id: string;
  size: number;
  constructor(name: string, ownerName: string) {
    this.#clients = {};
    this.#isHidden = false;
    this.name = name;
    this.ownerName = ownerName;
    this.id = nanoid(16);
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
        level: character.level,
      };
    });
  }

  get isHidden() {
    return this.#isHidden;
  }

  set isHidden(hidden: boolean) {
    this.#isHidden = hidden;
  }

  get clients(): Array<Client> {
    return Object.values(this.#clients);
  }

  get socketRoom() {
    return `lobby:${this.id}`;
  }

  clientIsInLobby(client: Client): boolean {
    const member = Object.values(this.#clients).find(
      (member) => member.character.id === client.character.id
    );
    return member !== undefined;
  }

  join(client: Client) {
    if (this.size === LOBBY_MAX_SIZE) {
      return Err("Lobby is full");
    }

    if (this.#clients[client.character.id] !== undefined) {
      return Err("Already in the lobby");
    }

    this.#clients[client.character.id] = client;
    this.size++;
    return Ok(1);
  }

  leave(client: Client) {
    const isInLobby = this.#clients[client.character.id] !== undefined;

    if (!isInLobby) {
      return false;
    }
    delete this.#clients[client.character.id];
    this.size--;

    if (this.size > 0) {
      // transfer ownership after leaving to a random client
      const randomClient = choice(Object.values(this.#clients));
      this.ownerName = randomClient.character.name;
    }

    return true;
  }

  kick(characterName: string): Client | undefined {
    const targetClient = Object.values(this.#clients).find(
      (client) => client.character.name === characterName
    );

    if (targetClient !== undefined) {
      delete this.#clients[targetClient.character.id];
      this.size--;
    }

    return targetClient;
  }

  clientIsOwner(client: Client) {
    return this.ownerName === client.character.name;
  }
}

export default Lobby;
