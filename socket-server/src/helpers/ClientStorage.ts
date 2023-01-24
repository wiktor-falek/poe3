import { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";
import Client from "./Client";

class ClientStorage {
  clients: Map<string, Client>;
  constructor() {
    this.clients = new Map();
  }

  getClient(username: string): Client | undefined {
    return this.clients.get(username);
  }

  addClient(username: string, character: Character, characterModel: CharacterModel) {
    const existingClient = this.getClient(username);

    if (
      existingClient &&
      existingClient.player.character.name === character.name
    ) {
      return existingClient;
    }

    const client = new Client(username, character, characterModel);
    this.clients.set(username, client);
    return client;
  }

  // meant to run in a cron-job to remove Client objects that haven't
  // been connected to for specified amout of time (defaults to 5 min)
  deleteInactiveClients(timeMs = 300000) {}
}

export default new ClientStorage();
