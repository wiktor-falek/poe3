import { Character } from "../../*";
import Client from "./Client";

class ClientStorage {
  clients: Map<string, Client>;
  constructor() {
    this.clients = new Map();
  }

  getClient(username: string): Client | undefined {
    return this.clients.get(username);
  }

  addClient(username: string, character: Character) {
    const existingClient = this.getClient(username);

    // use existing client if the same character clicks on Main Story to allow reconnecting
    if (existingClient && existingClient.player.character.name === character.name) {
      return existingClient;
    }

    const client = new Client(username, character);
    this.clients.set(username, client);
    return client;
  }
}

export default new ClientStorage();
