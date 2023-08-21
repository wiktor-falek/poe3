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

type ActionResult = {
  attacker: Player | Enemy;
  target: Player | Enemy;
  damage: number;
  damageType: "physical";
  critical: boolean;
};

type TurnStart = {
  entity: Player | Enemy;
};

class Combat {
  #turnIdx: number;
  #turnOrder: ReadonlyArray<Player | Enemy>;
  state: "UNINITIALIZED" | "ONGOING" | "CONCLUDED";
  players: Player[];
  enemies: Enemy[];
  #logs: (ActionResult | TurnStart)[];
  constructor(players: Player[], enemies: Enemy[]) {
    this.players = players;
    this.enemies = enemies;
    this.state = "UNINITIALIZED";
    this.#turnIdx = 0;
    this.#logs = [];
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

  get logs() {
    return this.#logs.map((log) => {
      if ("attacker" in log) {
        `${log.attacker.name} attacked ${log.target.name}, received ${log.damage} ${log.damageType} damage.` +
        log.critical
          ? "Critical Hit!"
          : "";
      } else {
        `${log.entity}'s turn.`;
      }
    });
  }

  begin() {
    this.state = "ONGOING";
    this.continue();
  }

  async continue() {
    let entity = this.nextEntity();
    while (entity instanceof Enemy) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      console.log("enemy turn");
      const enemyAction = entity.randomAction(this.players);
      entity = this.nextEntity();
    }
  }

  playerAction(target: Enemy | Player, skillId: number) {
    // validate that you are the current player
    const player = this.currentTurn;
    if (!(player instanceof Player)) {
      return Err("Not your turn");
    }

    player.action(null);
  }

  nextEntity() {
    this.#turnIdx++;
    if (this.#turnIdx > this.#turnOrder.length - 1) {
      this.#turnIdx = 0;
    }

    const entity = this.#turnOrder[this.#turnIdx];
    return entity;
  }
}

export default Combat;
