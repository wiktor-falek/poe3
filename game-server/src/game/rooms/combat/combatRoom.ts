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

type RoomType = "combat" | "reward";

class CombatRoom {
  type: RoomType;
  #turn: Turn;
  players: Array<Player>;
  enemies: Array<Enemy>;
  currentTurnPlayerName?: string;
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

    console.log(actionData);
    return Ok(actionData);
  }

  continue() {
    const state: {
      currentTurnPlayerName?: string;
      playersWon: boolean;
      enemiesWon: boolean;
      actions: Array<ActionData>;
    } = {
      playersWon: false,
      enemiesWon: false,
      actions: [],
    };

    while (true) {
      if (this.playersWon) {
        state.playersWon = true;
        return state;
      }
      if (this.enemiesWon) {
        state.enemiesWon = true;
        return state;
      }

      const entity = this.#turn.next();

      console.log(entity);

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

        this.currentTurnPlayerName = this.#turn.current?.name;
        state.currentTurnPlayerName = this.currentTurnPlayerName;
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
