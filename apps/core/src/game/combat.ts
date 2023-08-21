import { shuffle } from "pyrand";
import Enemy from "./entities/enemy.js";
import Player from "./entities/player.js";
import { Err, Ok } from "resultat";
import { Action, ActionResult, TurnStart } from "../../types.js";

class Combat {
  _turnIdx: number;
  _turnOrder: ReadonlyArray<Player | Enemy>;
  state: "UNINITIALIZED" | "ONGOING" | "PLAYER_WIN" | "ENEMY_WIN";
  players: Player[];
  enemies: Enemy[];
  logs: (ActionResult | TurnStart)[];
  constructor(players: Player[], enemies: Enemy[]) {
    this.players = players;
    this.enemies = enemies;
    this.state = "UNINITIALIZED";
    this._turnIdx = 0;
    this.logs = [];
    const turnOrder = [...this.players, ...this.enemies];
    shuffle(turnOrder);
    this._turnOrder = turnOrder;
  }

  get currentTurn() {
    return this._turnOrder[this._turnIdx];
  }

  // get playersWon() {
  //   return this.enemies.filter((enemy) => enemy.isAlive).length === 0;
  // }

  // get enemiesWon() {
  //   return this.players.filter((player) => player.isAlive).length === 0;
  // }

  // get hasConcluded() {
  //   return this.enemiesWon || this.playersWon;
  // }

  get humanReadableLogs() {
    return this.logs.map((log) => {
      if ("attacker" in log) {
        return `${log.attacker.name} attacked ${log.target.name}, received ${log.damage} ${log.damageType} damage.`;
      } else {
        return `${log.entity.name}'s turn.`;
      }
    });
  }

  begin() {
    this.state = "ONGOING";
    this.continue();
  }

  /*
  TODO:
    entity.turnStart() // start of turn effects, dots are applied, debuffs expire.
  */

  continue() {
    let entity = this.nextEntity();
    while (this.state === "ONGOING" && entity instanceof Enemy) {
      console.log("enemy turn");
      const actionResult = entity.randomAction(this.players);
      this.logs.push(actionResult);
      entity = this.nextEntity();
    }
  }

  playerAction(player: Player, action: Action, target: Enemy | Player) {
    if (player.id !== this.currentTurn.id) {
      return Err("Not your turn");
    }
    const actionResult = player.action(action, target);
    if (typeof actionResult === "string") {
      console.log(actionResult);
    } else {
      this.logs.push(actionResult);
    }
  }

  nextEntity() {
    this._turnIdx++;
    if (this._turnIdx > this._turnOrder.length - 1) {
      this._turnIdx = 0;
    }

    const entity = this._turnOrder[this._turnIdx];
    this.logs.push({ entity });
    return entity;
  }
}

export default Combat;
