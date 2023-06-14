import { shuffle } from "pyrand";
import Enemy from "../entities/enemy.js";
import Player from "../entities/player.js";
import Turn from "../combat/turn.js";

class CombatRoom {
  #turn: Turn;
  players: Array<Player>;
  enemies: Array<Enemy>;
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.players = players;
    this.enemies = enemies;
    this.#turn = new Turn(players, enemies);
  }

  get turn() {
    return this.#turn;
  }
}

export default CombatRoom;
