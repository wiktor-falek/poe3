import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import { getDynamicCharacter } from "@poe3/core";
import { testEnemies } from "../../game/entities/enemy.js";
import Player from "../../game/entities/player.js";
import CombatRoom from "../../game/rooms/combatRoom.js";

class Instance {
  #clients: { [characterId: string]: Client };
  #id: string;
  room?: CombatRoom;
  #players?: Array<Player>;
  constructor() {
    this.#clients = {};
    this.#id = nanoid(16);
  }

  initPlayers() {
    const players = Object.values(this.#clients).map(
      (client) => new Player(getDynamicCharacter(client.character))
    );
    this.#players = players;
    return players;
  }

  initCombatRoom(): CombatRoom {
    if (this.#players === undefined) {
      this.initPlayers();
    } else {
      // this is not the first room, filter out dead players
      this.#players = this.#players.filter((player) => player.isAlive);
    }

    const enemies = testEnemies();
    const room = new CombatRoom(this.#players!, enemies);
    this.room = room;
    return room;
  }

  get clients() {
    return Object.values(this.#clients);
  }

  get clientCount() {
    return Object.keys(this.#clients).length;
  }

  get id() {
    return this.#id;
  }

  get socketRoom() {
    return `instance:${this.#id}`;
  }

  join(client: Client) {
    this.#clients[client.character.id] = client;
  }

  leave(client: Client) {
    delete this.#clients[client.character.id];
  }
}

export default Instance;
