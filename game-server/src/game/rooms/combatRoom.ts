import { choice, shuffle } from "pyrand";
import Enemy from "../entities/enemy.js";
import Player, { ActionResult } from "../entities/player.js";
import { Err, Ok } from "resultat";
import type { RestoredResources } from "../entities/player.js";

export interface ActionData {
  targetId: string;
  attackerId: string;
  damage: number;
  critical: boolean;
  cost?: {
    ap?: number;
    mp?: number;
    hp?: number;
  };
}

export interface StateUpdate {
  actions: Array<ActionData>;
  restoredResources?: RestoredResources;
}

type RoomType = "combat" | "reward";

class CombatRoom {
  type: RoomType;
  players: Array<Player>;
  enemies: Array<Enemy>;
  #turnOrder: Array<Player | Enemy>;
  #entityIdx: number;
  #currentTurnEntity?: Player | Enemy;
  currentTurnPlayerName: string;
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.type = "combat";
    this.players = players;
    this.enemies = enemies;
    // turn order
    this.#turnOrder = [];
    this.createTurnOrder();
    this.#entityIdx = 0;
    this.#currentTurnEntity; // private to avoid emitting whole entity data
    this.currentTurnPlayerName = ""; // instead only id gets emitted
  }

  get currentTurnEntity() {
    return this.#currentTurnEntity;
  }

  createTurnOrder() {
    this.#turnOrder = [...this.players, ...this.enemies];
    shuffle(this.#turnOrder);
  }

  nextEntity() {
    if (this.#entityIdx > this.#turnOrder.length - 1) {
      this.#entityIdx = 0;
    }

    const entity = this.#turnOrder[this.#entityIdx];
    this.#currentTurnEntity = entity;
    this.currentTurnPlayerName = entity.name;

    this.#entityIdx++;
    return entity;
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

  playerAction(player: Player, targetId: string, actionId: string) {
    const target = this.enemies.find((enemy) => enemy.id === targetId);
    if (target === undefined) {
      return Err("Invalid target");
    }

    if (!target.isAlive) {
      return Err("Target is dead");
    }

    const VALID_ACTIONS: { [id: string]: string } = {
      "0": "BASIC_ATTACK",
    };

    const actionName = VALID_ACTIONS[actionId];

    let action: ActionResult;
    switch (actionName) {
      case "BASIC_ATTACK":
        const result = player.basicAttack();
        if (result.ok) {
          action = result.val;
          break;
        }

      default:
        return Err("Invalid action");
    }

    const damage = target.takeDamage(action.damage);

    const actionData: ActionData = {
      ...action,
      attackerId: player.id,
      targetId,
    };

    return Ok(actionData);
  }

  continue(): StateUpdate {
    const state: {
      actions: Array<ActionData>;
      restoredResources: RestoredResources;
    } = {
      actions: [],
      restoredResources: { entityId: "" },
    };

    while (true) {
      if (this.hasConcluded) {
        return state;
      }

      const entity = this.nextEntity();

      if (entity instanceof Enemy) {
        const action = this.enemyAction(entity);
        state.actions.push(action);
      } else if (entity instanceof Player) {
        const restoredResources = entity.turnStart();
        state.restoredResources = restoredResources;
        break;
      }
    }

    return state;
  }

  private enemyAction(enemy: Enemy) {
    const action = enemy.basicAttack();
    const target = choice(this.players);
    // const damage =
    target.takeDamage(action.damage); // TODO: read damage after damage reduction
    return { ...action, targetId: target.id };
  }
}

export default CombatRoom;
