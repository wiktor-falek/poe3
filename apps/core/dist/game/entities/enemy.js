import { nanoid } from "nanoid";
import { randint } from "pyrand";
class Enemy {
    id;
    name;
    level;
    attributes;
    resources;
    resistances;
    constructor(name, level, maxHp) {
        this.id = nanoid(12);
        this.name = name;
        this.level = level;
        this.attributes = {
            strength: 1,
            dexterity: 1,
            intelligence: 1,
            vitality: 1,
            speed: level * 2,
        };
        this.resources = {
            hp: maxHp,
            maxHp: maxHp,
        };
        this.resistances = {
            fire: 0,
            cold: 0,
            lightning: 0,
            poison: 0,
        };
    }
    get isAlive() {
        return this.resources.hp > 0;
    }
    takeDamage(amount) {
        const amountAfterReduction = amount;
        this.resources.hp = Math.max(this.resources.hp - amountAfterReduction, 0);
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
export default Enemy;
