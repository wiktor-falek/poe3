import { nanoid } from "nanoid";
import { Err, Ok } from "resultat";
import { randint } from "pyrand";
import { getBaseClassAttributes } from "../../baseClassAttributes.js";
import getResources from "../../utils/getResources.js";
class Player {
    id;
    name;
    level;
    class;
    attributes;
    resources;
    resistances;
    constructor(character) {
        this.id = nanoid(12);
        this.name = character.name;
        this.level = character.level;
        this.class = character.class;
        this.attributes = getBaseClassAttributes(this.class);
        this.resources = getResources(this.level, this.attributes);
        this.resistances = {
            fire: 0,
            cold: 0,
            lightning: 0,
            poison: 0,
        };
    }
    isAlive() {
        return this.resources.hp > 0;
    }
    turnStart() {
        this.resources.ap = this.resources.maxAp;
        return { playerId: this.id, resources: { ap: this.resources.ap } };
    }
    takeDamage(amount, damageType) {
        const amountAfterReduction = amount;
        this.resources.hp = Math.max(this.resources.hp - amountAfterReduction, 0);
        return amountAfterReduction;
    }
    basicAttack() {
        const AP_COST = 1;
        // check if resource costs can be met
        if (this.resources.ap < AP_COST) {
            return Err("Resource costs not met");
        }
        // deduct costs from resources
        this.resources.ap -= AP_COST;
        // roll the attack
        const CRIT_CHANCE = 20;
        const CRIT_MULTIPLIER = 2.0;
        let damage = randint(3, 5);
        const critRoll = randint(1, 100);
        const isCritical = CRIT_CHANCE > critRoll;
        if (isCritical) {
            damage = Math.floor(damage * CRIT_MULTIPLIER);
        }
        return Ok({ damage, critical: isCritical, cost: { ap: AP_COST } });
    }
}
export default Player;
