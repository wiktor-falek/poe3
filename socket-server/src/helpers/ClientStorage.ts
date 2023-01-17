import { Character } from "../../*";
import logger from "../logger";
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
    if (existingClient) {
      logger.info(`${username} rejoined`)
      return existingClient;
    }

    const client = new Client(username, character);
    this.clients.set(username, client);
    return client;
  }
}

export default new ClientStorage();