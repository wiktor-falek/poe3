import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { DynamicCharacter } from "../../../../common/index.js";
import getDynamicCharacter from "../../../../common/dist/getDynamicCharacter.js";
import Enemy from "../entities/enemy.js";

export interface InstanceData {
  someData: { test: string };
}

class Instance implements InstanceData {
  #clients: { [characterId: string]: Client };
  characters: { [characterId: string]: DynamicCharacter };
  enemies: { [enemyId: string]: Enemy };
  #id: string;
  someData: { test: string };
  constructor() {
    this.#clients = {};
    this.characters = {};
    this.#id = nanoid();
    this.someData = { test: "Instance Data" };
    this.enemies = {};
  }

  get clients() {
    return Object.values(this.#clients);
  }

  get id() {
    return this.#id;
  }

  get room() {
    return `instance:${this.#id}`;
  }

  join(client: Client) {
    this.#clients[client.character._id.toString()] = client;
    this.characters[client.character._id.toString()] = getDynamicCharacter(client.character);
  }

  leave(client: Client) {
    delete this.#clients[client.character._id.toString()];
  }
}

export default Instance;
