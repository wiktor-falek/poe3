import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";

export interface InstanceData {
  someData: { test: string };
}

class Instance implements InstanceData {
  #clients: { [characterId: string]: Client };
  #id: string;
  someData: { test: string };
  constructor() {
    this.#clients = {};
    this.#id = nanoid();
    this.someData = { test: "Instance Data" };
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
    delete this.#clients[client.character._id.toString()];
  }
}

export default Instance;
