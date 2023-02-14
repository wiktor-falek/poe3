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

  getClient(username: string): Client | undefined {
    return this.clients.get(username);
  }

  addClient(
    username: string,
    character: Character,
    characterModel: CharacterModel
  ) {
    const existingClient = this.getClient(username);

    const existingId =
      existingClient?.characterModelProxy.character._id.toString();
    const currentId = character._id.toString();

    if (
      existingClient &&
      existingId &&
      currentId &&
      existingId === currentId
    ) {
      return existingClient;
    }
    const client = new Client(username, character, characterModel);
    this.clients.set(username, client);
    return client;
  }

  // meant to run in a cron-job to remove Client objects that haven't
  // been connected to for specified amout of time (defaults to 5 min)
  deleteInactiveClients(timeMs = 300000) {

  }
}

export default new ClientStorage();
