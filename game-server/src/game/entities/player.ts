import { randint } from "pyrand";
import { DynamicCharacter } from "../../../../common/index.js";

class Player {
  #dynamicCharacter: DynamicCharacter;
  constructor(dynamicCharacter: DynamicCharacter) {
    this.#dynamicCharacter = dynamicCharacter;
  }

  isAlive() {
    return this.#dynamicCharacter.resources.hp > 0;
  }

  basicAttack() {
    const CRIT_CHANCE = 5;
    const CRIT_MULTIPLIER = 1.5;

    let damage = randint(2, 3);

    const critRoll = randint(1, 100);
    const isCritical = critRoll > CRIT_CHANCE;
    if (isCritical) {
      damage = Math.floor(damage * CRIT_MULTIPLIER);
    }

    return { damage, critical: isCritical };
  }
}

export default Player;
