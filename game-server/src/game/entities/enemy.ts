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
    this.id = nanoid();
    this.name = name;
    this.level = level;
    this.maxHp = maxHp;
    this.hp = maxHp;
    this.speed = level;
  }

  isAlive() {
    return this.hp > 0;
  }

  takeDamage(amount: number) {
    const amountAfterReduction = amount;
    this.hp = Math.max(this.hp - amountAfterReduction, 0);
    // TODO: amountAfterReduction might exceed this.hp, it also should be 0 at most 
    return amountAfterReduction;
  }

  basicAttack() {
    const CRIT_CHANCE = 5;
    const CRIT_MULTIPLIER = 1.5;

    let damage = randint(2, 3);

    const critRoll = randint(1, 100);
    const isCritical = CRIT_CHANCE > CRIT_CHANCE;
    if (isCritical) {
      damage = Math.floor(damage * CRIT_MULTIPLIER);
    }

    return { damage, critical: isCritical, attackerId: this.id };
  }
}

export const testEnemies = () => {
  return [new Enemy("Rat", 1, 10), new Enemy("Rat", 1, 10), new Enemy("Rat", 1, 10)];
};

export default Enemy;
