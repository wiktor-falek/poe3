import { randint } from "pyrand";
import { DynamicCharacter, Resources } from "../../../../common/index.js";
import { nanoid } from "nanoid";

// data that will be shared between clients in an instance
interface PlayerData {
  name: string;
  level: number;
  resources: Resources;
}

class Player implements PlayerData {
  #dynamicCharacter: DynamicCharacter;
  id: string;
  name: string;
  level: number;
  resources: Resources;
  constructor(dynamicCharacter: DynamicCharacter, characterId: string) {
    this.#dynamicCharacter = dynamicCharacter;
    this.id = nanoid();
    this.name = dynamicCharacter.name;
    this.level = dynamicCharacter.level.value;
    this.resources = dynamicCharacter.resources;
  }

  get speed() {
    return this.#dynamicCharacter.attributes.speed;
  }

  isAlive() {
    return this.#dynamicCharacter.resources.hp > 0;
  }

  takeDamage(amount: number) {
    this.resources.hp = Math.max(this.resources.hp - amount, 0);
  }

  basicAttack() {
    const CRIT_CHANCE = 5;
    const CRIT_MULTIPLIER = 1.5;

    let damage = randint(2, 3);

    const critRoll = randint(1, 100);
    const isCritical = CRIT_CHANCE > critRoll;
    if (isCritical) {
      damage = Math.floor(damage * CRIT_MULTIPLIER);
    }

    return { damage, critical: isCritical };
  }
}

export default Player;
