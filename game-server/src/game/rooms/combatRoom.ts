import { choices, shuffle } from "pyrand";
import Enemy, { testEnemies } from "../entities/enemy.js";
import Player from "../entities/player.js";

type EntityId = string;

class CombatRoom {
  #turnOrder: Array<EntityId>;
  players: Array<Player>;
  enemies: Array<Enemy>;
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.#turnOrder = [];
    this.players = players;
    this.enemies = enemies;
  }

  get turnOrder() {
    return this.#turnOrder;
  }

  randomizeTurnOrder() {
    const entities = [...Object.values(this.players), ...Object.values(this.enemies)];
    // TODO: balance the odds by including the speed of each entity
    const ids = entities.map(entity => entity.id);
    shuffle(ids);
    return ids;
  }
}

export default CombatRoom;
