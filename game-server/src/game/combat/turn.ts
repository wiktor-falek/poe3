import { shuffle } from "pyrand";
import type Enemy from "../entities/enemy.js";
import type Player from "../entities/player.js";

type Entity = Enemy | Player;

class Turn {
  #entities: Array<Entity>;
  turn: Generator<Entity, void, unknown>;
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.#entities = [...players, ...enemies];
    this.createTurnOrder();
    this.turn = this.generateTurn();
  }

  get hasEnded() {
    return !!this.turn.return().done;
  }

  startTurn() {
    this.turn = this.generateTurn();
  }

  next() {
    const entity = this.turn.next().value;
    return entity;
  }

  private *generateTurn() {
    for (const entity of this.#entities) {
      yield entity;
    }
  }

  createTurnOrder() {
    // TODO: balance the odds by including the speed of each entity
    shuffle(this.#entities);
    return this.#entities;
  }
}

export default Turn;
