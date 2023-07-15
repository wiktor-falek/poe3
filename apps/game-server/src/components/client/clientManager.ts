import { User } from "types/user.js";
import { Character } from "types/character.js";
import { IoSocket } from "../../index.js";
import Client from "./client.js";
import type { WithId } from "mongodb";

class ClientManager {
  static readonly clients: Map<string, Client> = new Map();

  static getClientByUsername(username: string) {
    const client = this.clients.get(username);
    return client;
  }

  static getClientByCharacterName(characterName: string): Client | undefined {
    const client = Array.from(this.clients.values()).find(
      (client) => client.characterName === characterName
    );
    return client;
  }

  static createClient(user: User, character: Character, socket: IoSocket): Client {
    const client = new Client(user, character, socket);
    this.clients.set(user.username, client);
    return client;
  }
}

export default ClientManager;
