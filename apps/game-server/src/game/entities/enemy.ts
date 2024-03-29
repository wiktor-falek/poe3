import { nanoid } from "nanoid";
import { randint } from "pyrand";

class Enemy {
  id: string;
  name: string;
  level: number;
  hp: number;
  maxHp: number;
  speed: number;
  public constructor(name: string, level: number, maxHp: number) {
    this.id = nanoid(8);
    this.name = name;
    this.level = level;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.speed = level;
  }

  get isAlive() {
    return this.hp > 0;
  }

  takeDamage(amount: number): number {
    const amountAfterReduction = amount;
    this.hp = Math.max(this.hp - amountAfterReduction, 0);
    return amountAfterReduction;
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

    return { damage, critical: isCritical, attackerId: this.id };
  }
}

export const testEnemies = () => {
  return [new Enemy("Rat", 1, 20), new Enemy("Rat", 1, 20), new Enemy("Rat", 1, 20)];
};

export default Enemy;
