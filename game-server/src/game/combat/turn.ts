import { shuffle } from "pyrand";
import type Enemy from "../entities/enemy.js";
import type Player from "../entities/player.js";

type Entity = Enemy | Player;

class Turn {
  #entities: Array<Entity>;
  #turn: Generator<Entity, void, unknown>;
  #current: Entity | null;
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.#entities = [...players, ...enemies];
    this.createTurnOrder();
    this.#turn = this.generateTurn();
    this.#current = null;
  }

  private *generateTurn() {
    for (const entity of this.#entities) {
      yield entity;
    }
  }

  startTurn() {
    this.#turn = this.generateTurn();
  }

  next() {
    const entity = this.#turn.next().value ?? null;
    this.#current = entity;
    return entity;
  }

  createTurnOrder() {
    // TODO: balance the odds by including the speed of each entity
    shuffle(this.#entities);
    return this.#entities;
  }

  get hasEnded() {
    return this.current === null;
  }

  get current() {
    return this.#current;
  }
}

export default Turn;
