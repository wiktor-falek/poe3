import { choice, shuffle } from "pyrand";
import Enemy from "../entities/enemy.js";
import Player, { ActionResult } from "../entities/player.js";
import { Err, Ok } from "resultat";
import { LootFactory } from "../../../../items/dist/index.js";
import type { TurnStartUpdate } from "../entities/player.js";

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
  turnStartUpdate?: TurnStartUpdate;
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
  #rewards: { [playerId: string]: Array<any> | null } = {}; // TODO: import return type of the LootFactory.generateLoot()
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.type = "combat";
    this.players = players;
    this.enemies = enemies;
    // turn order
    this.#turnOrder = [];
    this.#currentTurnEntity; // private to avoid emitting whole entity data
    this.currentTurnPlayerName = ""; // instead only id gets emitted
    this.#entityIdx = 0;
    this.createTurnOrder();
  }

  get currentTurnEntity() {
    return this.#currentTurnEntity;
  }

  createTurnOrder() {
    this.#turnOrder = [...this.players, ...this.enemies];
    shuffle(this.#turnOrder);

    // in case one of the players goes first, initialize currentTurnPlayerName
    const firstEntity = this.#turnOrder[0];
    if (firstEntity instanceof Player) {
      this.currentTurnPlayerName = firstEntity.name;
    }
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
      turnStartUpdate: TurnStartUpdate;
    } = {
      actions: [],
      turnStartUpdate: { playerId: "" },
    };

    while (true) {
      if (this.hasConcluded) {
        return state;
      }

      const entity = this.nextEntity();

      if (entity instanceof Enemy) {
        if (entity.isAlive) {
          const action = this.enemyAction(entity);
          state.actions.push(action);
        }
      } else if (entity instanceof Player) {
        const turnStartUpdate = entity.turnStart();
        state.turnStartUpdate = turnStartUpdate;
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

  getRewards(player: Player): Array<any> | null {
    /*
    whenever a player tries to accces the reward
    and it happens to be undefined it means it has not been
    generated, in that case generate the reward

    once the reward gets claimed by the player, 
    this.#rewards[player.id] will be set to null
    */

    if (this.#rewards[player.id] === undefined) {
      const lootFactory = new LootFactory();
      this.#rewards[player.id] = lootFactory.generateLoot(1);
    }
    const rewards = this.#rewards[player.id];
    return rewards;
  }

  claimRewards(player: Player) {
    if (this.#rewards[player.id] !== undefined) {
      this.#rewards[player.id] = null;
      return Ok(1);
    }
    return Err("No reward to be claimed");
  }
}

export default CombatRoom;
