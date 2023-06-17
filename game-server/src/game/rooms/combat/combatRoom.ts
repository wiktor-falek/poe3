import { choice } from "pyrand";
import ClientManager from "../../../components/client/clientManager.js";
import Enemy from "../../entities/enemy.js";
import Player, { ActionResult } from "../../entities/player.js";
import Turn from "./turn.js";
import { Err, Ok } from "resultat";
import type { RestoredResources } from "../../entities/player.js";

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

export interface TurnStartUpdate extends RestoredResources {
  playerName: string;
}

type RoomType = "combat" | "reward";

class CombatRoom {
  type: RoomType;
  #turn: Turn;
  players: Array<Player>;
  enemies: Array<Enemy>;
  constructor(players: Array<Player>, enemies: Array<Enemy>) {
    this.type = "combat";
    this.players = players;
    this.enemies = enemies;
    this.#turn = new Turn(players, enemies);
  }

  get turn() {
    return this.#turn;
  }

  get playersWon() {
    return this.enemies.filter(enemy => enemy.isAlive).length === 0;
  }

  get enemiesWon() {
    return this.players.filter(player => player.isAlive).length === 0;
  }

  get hasConcluded() {
    return this.enemiesWon || this.playersWon;
  }

  playerAction(player: Player, targetId: string, actionId: string) {
    const target = this.enemies.find(enemy => enemy.id === targetId);
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

  continue() {
    const state: {
      actions: Array<ActionData>;
      turnStartUpdate?: TurnStartUpdate;
    } = {
      actions: [],
    };

    while (true) {
      if (this.hasConcluded) {
        return state;
      }

      const entity = this.#turn.next();

      // if turn ended start next turn
      if (entity === null) {
        this.#turn.startTurn();
        continue;
      }

      if (entity instanceof Player) {
        const client = ClientManager.getClientByCharacterName(entity.name);
        if (client === undefined) {
          // shouldn't be possible
          console.error("Client is undefined");
          break;
        }

        // TODO: return this and then emit to all clients in the instance
        const updates = entity.turnStart(); // { resources: { hp: 1, ap: 3 } }

        state.turnStartUpdate = {
          ...updates,
          playerName: entity.name,
        };

        break;
      }

      if (entity instanceof Enemy) {
        const action = this.enemyAction(entity);
        state.actions.push(action);
      }
    }

    return state;
  }

  private enemyAction(enemy: Enemy) {
    const action = enemy.basicAttack();
    const target = choice(this.players);
    target.takeDamage(action.damage);
    return { ...action, targetId: target.id };
  }
}

export default CombatRoom;
