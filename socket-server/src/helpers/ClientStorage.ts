import { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";
import Client from "./Client";

class ClientStorage {
  clients: Map<string, Client>;
  constructor() {
    this.clients = new Map();
  }

  public get clientCount(): number {
    let count = 0;
    for (const client of this.clients.values()) {
      if (client.isConnected) {
        count++;
      }
    }
    return count;
  }

  getClientByUsername(username: string): Client | null {
    return this.clients.get(username) ?? null;
  }

  getClientByCharacterName(characterName: string): Client | null {
    for (const [username, client] of this.clients) {
      if (client.character.name === characterName) return client;
    }
    return null;
  }

  /**
   * Returns existing Client instance if user connected with the same character.
   * If Client doesn't exist instantiates it and adds to this.clients Map
   */
  addClient(
    socketId: string,
    username: string,
    character: Character,
    characterModel: CharacterModel
  ): Client {
    const existingClient = this.getClientByCharacterName(character.name);

    const existingId = existingClient?.character._id.toString();
    const currentId = character._id.toString();

    // use existing client instance if using the same character
    if (existingClient && currentId && existingId && existingId === currentId) {
      existingClient.socketId = socketId; // update socketId which changed after reconnect
      return existingClient;
    }
    const client = new Client(socketId, username, character, characterModel);
    this.clients.set(username, client);
    return client;
  }

  /**
   * Meant to run in a cron-job to remove Client objects that haven't
   * been connected to for specified amout of time (defaults to 5 min)
   */
  deleteInactiveClients(timeMs = 1000 * 60 * 5): Array<Client> {
    const now = Date.now();
    const deletedClients: Array<Client> = [];
    this.clients.forEach((client, key) => {
      if (
        !client.isConnected &&
        client.disconnectTimestamp &&
        now - client.disconnectTimestamp >= timeMs
      ) {
        const deleted = this.clients.delete(key);
        if (deleted) {
          deletedClients.push(client);
        }
      }
    });
    return deletedClients;
  }
}

export default new ClientStorage();
