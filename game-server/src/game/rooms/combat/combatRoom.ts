import { choice } from "pyrand";
import ClientManager from "../../../components/client/clientManager.js";
import Enemy from "../../entities/enemy.js";
import Player from "../../entities/player.js";
import Turn from "./turn.js";
import { Err, Ok } from "resultat";

interface ActionData {
  targetId: string;
  damage: number;
  critical: boolean;
  attackerId: string;
}

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

    let action;
    switch (actionName) {
      case "BASIC_ATTACK":
        action = player.basicAttack();
        break;

      default:
        return Err("Invalid action");
    }

    const damage = target.takeDamage(action.damage);

    const actionData: ActionData = {
      attackerId: player.id,
      targetId,
      damage,
      critical: action.critical,
    };

    return Ok(actionData);
  }

  continue() {
    const state: {
      yourTurn: boolean;
      actions: Array<ActionData>;
    } = {
      yourTurn: false,
      actions: [],
    };

    while (true) {
      const entity = this.#turn.next();

      // if turn ended start next turn
      if (entity === null) {
        this.#turn.startTurn();
        continue;
      }

      if (entity instanceof Player) {
        // emit to this client to take action
        // broadcast emit to clients in the room?
        // entity.dynamicCharacter
        const client = ClientManager.getClientByCharacterName(entity.name);
        if (client === undefined) {
          // shouldn't be possible
          console.error("Client is undefined");
          break;
        }

        state.yourTurn = true;
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
