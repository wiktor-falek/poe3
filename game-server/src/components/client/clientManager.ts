import Client from "./client.js";

class ClientManager {
  static readonly clients: Map<string, Client> = new Map();

  static getClientByUsername(username: string) {
    const client = this.clients.get(username);
    return client;
  }

  // static createClient(username: string, characterName: string): Client {
    // const client = new Client(username, characterName);
    // return client;
  // }
}

export default ClientManager;
