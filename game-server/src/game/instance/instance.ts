import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { DynamicCharacter } from "../../../../common/index.js";
import getDynamicCharacter from "../../../../common/dist/getDynamicCharacter.js";
import Enemy, { testEnemies } from "../entities/enemy.js";
import Player from "../entities/player.js";
import CombatRoom from "../rooms/combatRoom.js";

class Instance {
  #clients: { [characterId: string]: Client };
  #id: string;
  room?: CombatRoom;
  constructor() {
    this.#clients = {};
    this.#id = nanoid();
    // this.room = new CombatRoom()
  }

  createCombatRoom() {
    const players = Object.values(this.#clients).map(
      client => new Player(getDynamicCharacter(client.character), client.character._id.toString())
    );
    const enemies = testEnemies();
    this.room = new CombatRoom(players, enemies);
  }

  get clients() {
    return Object.values(this.#clients);
  }

  get id() {
    return this.#id;
  }

  get socketRoom() {
    return `instance:${this.#id}`;
  }

  join(client: Client) {
    this.#clients[client.character._id.toString()] = client;
  }

  leave(client: Client) {
    delete this.#clients[client.character._id.toString()];
  }
}

export default Instance;
