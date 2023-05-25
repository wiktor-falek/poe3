import { Room } from "./Room";
import type { RoomType } from "./Room";
import Entity from "../combat/Entity";
import Combat from "../combat/Combat";
import Enemy from "../combat/Enemy";
import { Level } from "../../../*";
import { randint } from "pyrand";

interface RoomOptions {}

class CombatRoom extends Room {
  type: RoomType;
  combat: Combat | null;
  constructor(id: number, name: string, zoneLvl: number) {
    super(id, name, zoneLvl);
    this.type = "combat";
    this.combat = null;
  }

  startCombat(allyParty: Array<Entity>) {
    const amountOfEnemies = randint(1, 3);

    const enemyParty = [];
    for (let i = 0; i < amountOfEnemies; i++) {
      // TODO: find a cleaner way than using Level interface that requires xp and requiredXp
      const level: Level = { value: 1, xp: 0, requiredXp: 0 };
      const resources = { hp: 5, maxHp: 5 };
      const attributes = {
        strength: 1,
        dexterity: 1,
        intelligence: 1,
        vitality: 1,
        speed: 1,
      };
      const actionPoints = { ap: 3, maxAp: 3 };
      enemyParty.push(
        new Enemy("Rat", level, resources, attributes, actionPoints)
      );
    }

    // assign incremental id to each entity
    let id = -1;
    for (const entity of [...allyParty, ...enemyParty]) {
      id++;
      entity.id = id;
    }

    this.combat = new Combat(allyParty, enemyParty);
    return this.combat;
  }

  claimReward(enemyParty: Array<Enemy>) {
    if (this.rewardClaimed) return null;
    
    const xp = enemyParty.map((enemy) => enemy.xpAward).reduce((a, b) => a + b);
    return { xp };
  }
}

export { CombatRoom };
export type { RoomOptions };