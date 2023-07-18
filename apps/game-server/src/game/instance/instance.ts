import { nanoid } from "nanoid";
import Client from "../../components/client/client.js";
import getDynamicCharacter from "common/getDynamicCharacter.js";
import { Character, DynamicCharacter } from "types/character.js";
import { testEnemies } from "../entities/enemy.js";
import Player from "../entities/player.js";
import CombatRoom from "../rooms/combatRoom.js";

function _getDynamicCharacter(character: Character): DynamicCharacter {
  const baseAttributes = {
    strength: 8,
    dexterity: 6,
    intelligence: 5,
    vitality: 8,
    speed: 5,
  };
  const attributes = { ...baseAttributes }; // calculate attributes

  const dynamicCharacter: DynamicCharacter = {
    ...character,
    resistances: {
      fire: 0,
      cold: 0,
      lightning: 0,
      poison: 0,
    },
    attributes,
    resources: {
      maxHp: 30,
      hp: 30,
      maxMp: 10,
      mp: 10,
      ap: 3,
      maxAp: 3,
    },
  };
  return dynamicCharacter;
}

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
      (client) => new Player(_getDynamicCharacter(client.character))
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
