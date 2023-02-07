import { Room } from "./Room";
import type { RoomType } from "./Room";
import Entity from "../combat/Entity";
import Combat from "../combat/Combat";
import Enemy from "../combat/Enemy";

interface RoomOptions {}

class CombatRoom extends Room {
  type: RoomType;
  combat: Combat | null;
  constructor(id: number, name: string, ilvl: number) {
    super(id, name, ilvl);
    this.type = "combat";
    this.combat = null;
  }

  startCombat(allyParty: Array<Entity>) {
    const level = { value: 1 };
    const resources = { hp: 5, maxHp: 5 };
    const attributes = {
      strength: 1,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
      speed: 1,
    };
    const hardCodedEnemy = () => new Enemy("Rat", level, resources, attributes);

    const amountOfEnemies = Math.floor(Math.random() * 3) + 1;

    const enemyParty = [];
    for (let i = 0; i < amountOfEnemies; i++) {
      enemyParty.push(hardCodedEnemy());
    }
    this.combat = new Combat(allyParty, enemyParty);
  }
}

export { CombatRoom };
export type { RoomOptions };
