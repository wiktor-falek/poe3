import { nanoid } from "nanoid";
import { randint } from "pyrand";

interface IEnemy {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
}

class Enemy implements IEnemy {
  id: string;
  hp: number;
  public constructor(
    public name: string,
    public level: number,
    public maxHp: number,
  ) {
    this.id = nanoid();
    this.hp = maxHp;
  }

  isAlive() {
    return this.hp > 0;
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

export default Enemy;
