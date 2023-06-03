import { StaticCharacter, User } from "../../../../common/types/index.js";
import Client from "./client.js";
import type { WithId } from "mongodb";

class ClientManager {
  static readonly clients: Map<string, Client> = new Map();

  static getClientByUsername(username: string) {
    const client = this.clients.get(username);
    return client;
  }

  static createClient(
    user: WithId<User>,
    character: WithId<StaticCharacter>
  ): Client {
    const client = new Client(user, character);
    return client;
  }
}

export default ClientManager;
