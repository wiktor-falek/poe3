import { randint } from "pyrand";
import { DynamicCharacter, Resources } from "../../../../common/types/index.js";
import { nanoid } from "nanoid";
import { Err, Ok, Result } from "resultat";

// data that will be shared between clients in an instance
interface PlayerData {
  name: string;
  level: number;
  resources: Resources;
}

export interface turnStartUpdate {
  playerId: string;
  resources?: {
    ap?: number;
    mp?: number;
    hp?: number;
  };
}

export interface ActionResult {
  damage: number;
  critical: boolean;
  cost?: {
    ap?: number;
    mp?: number;
    hp?: number;
  };
}

class Player implements PlayerData {
  #dynamicCharacter: DynamicCharacter;
  id: string;
  name: string;
  level: number;
  resources: Resources;
  constructor(dynamicCharacter: DynamicCharacter) {
    this.#dynamicCharacter = dynamicCharacter;
    this.id = nanoid(8);
    this.name = dynamicCharacter.name;
    this.level = dynamicCharacter.level.value;
    this.resources = dynamicCharacter.resources;
  }

  get speed() {
    return this.#dynamicCharacter.attributes.speed;
  }

  get isAlive() {
    return this.#dynamicCharacter.resources.hp > 0;
  }

  turnStart(): turnStartUpdate {
    this.resources.ap = this.resources.maxAp;
    return { playerId: this.id, resources: { ap: this.resources.ap } };
  }

  takeDamage(amount: number): number {
    const amountAfterReduction = amount;
    this.resources.hp = Math.max(this.resources.hp - amountAfterReduction, 0);
    return amountAfterReduction;
  }

  basicAttack(): Result<ActionResult> {
    const AP_COST = 1;

    // check if resource costs can be met
    if (this.resources.ap < AP_COST) {
      return Err("Resource costs not met");
    }

    // deduct costs from resources
    this.resources.ap -= AP_COST;

    // roll the attack
    const CRIT_CHANCE = 5;
    const CRIT_MULTIPLIER = 1.5;

    let damage = randint(2, 3);
    const critRoll = randint(1, 100);
    const isCritical = CRIT_CHANCE > critRoll;
    if (isCritical) {
      damage = Math.floor(damage * CRIT_MULTIPLIER);
    }

    return Ok({ damage, critical: isCritical, cost: { ap: AP_COST } });
  }
}

export default Player;
