import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";

class Instance {
  #clients: { [characterId: string]: Client };
  #id: string;
  constructor() {
    this.#clients = {};
    this.#id = nanoid();
  }

  get clients() {
    return Object.values(this.#clients);
  }

  get id() {
    return this.#id;
  }


  join(client: Client) {
    this.#clients[client.character._id.toString()] = client;
  }

  leave(client: Client) {
    // client.instanceId = null;
  }
}

export default Instance;
