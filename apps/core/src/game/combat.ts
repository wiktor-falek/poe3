import { shuffle } from "pyrand";
import Enemy from "./entities/enemy.js";
import type Player from "./entities/player.js";

class Combat {
  players: Player[];
  enemies: Enemy[];
  #turnIdx: number;
  #turnOrder: ReadonlyArray<Player | Enemy>;
  constructor(players: Player[], enemies: Enemy[]) {
    this.players = players;
    this.enemies = enemies;

    this.#turnIdx = 0;
    const turnOrder = [...this.players, ...this.enemies];
    shuffle(turnOrder);
    this.#turnOrder = turnOrder;
  }

  get currentTurn() {
    return this.#turnOrder[this.#turnIdx];
  }

  get playersWon() {
    return this.enemies.filter((enemy) => enemy.isAlive).length === 0;
  }

  get enemiesWon() {
    return this.players.filter((player) => player.isAlive).length === 0;
  }

  get hasConcluded() {
    return this.enemiesWon || this.playersWon;
  }

  begin() {
    // ...
  }

  continue() {
    // TODO: return all the actions of enemies
    let entity = this.nextEntity();
    while (!this.hasConcluded && entity instanceof Enemy) {
      const enemyAction = entity.randomAction(this.players);
      // have Enemy choose an action
    }
  }

  playerAction() {}

  nextEntity() {
    if (this.#turnIdx > this.#turnOrder.length - 1) {
      this.#turnIdx = 0; // circular array
    }
    const entity = this.#turnOrder[this.#turnIdx];
    this.#turnIdx++;

    return entity;
  }
}

export default Combat;
