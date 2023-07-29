import { shuffle } from "pyrand";
import Enemy from "./entities/enemy.js";
import Player from "./entities/player.js";
import { Err, Ok } from "resultat";

/*

1. combat is set up:
    Player[], Enemy[], turnOrder = [Enemy, Player, Enemy, Enemy];
   
2. Combat.begin():
    players recover: hp, mp
    ap is set to max

3. Combat.continue():
    iterate over each entity in turnOrder, if entity instanceof Enemy: Enemy.randomAction()
    Enemy.turnStart() // start of turn effects, dots are applied, debuffs expire.
    if entity instanceof Player: Player.turnStart(), wait for playerAction 
*/

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
    let entity = this.nextEntity();
    while (!this.hasConcluded && entity instanceof Enemy) {
      const enemyAction = entity.randomAction(this.players);
      entity = this.nextEntity();
    }
  }

  playerAction(target: Enemy | Player, skillId: number) {
    const entity = this.currentTurn;
    if (!(entity instanceof Player)) {
      return Err("Not your turn");
    }

    if (skillId === 0) {
      if (target instanceof Player) {
        return Err("Cannot attack another player");
      }
      entity.basicAttack(target);
      return Ok(1);
    }
    return Err("Invalid skillId");
  }

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
