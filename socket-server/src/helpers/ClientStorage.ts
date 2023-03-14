import { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";
import Client from "./Client";

class ClientStorage {
  clients: Map<string, Client>;
  constructor() {
    this.clients = new Map();
  }

  public get clientCount(): number {
    // TODO: optimize this to be O(1)
    // by having count as a property, which is updated
    // whenever a property isConnected of a Client mutates
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
   * Returns existing client, or creates a new one and returns it
   */
  addClient(
    socketId: string,
    username: string,
    character: Character,
    characterModel: CharacterModel
  ) {
    const existingClient = this.getClientByUsername(username);

    const existingId = existingClient?.character.id;
    const currentId = character.id;

    if (existingClient && currentId && existingId && existingId === currentId) {
      existingClient.socketId = socketId; // make sure that socketId is updated after reconnect
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
