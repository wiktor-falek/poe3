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
    function randint(min: number, max: number) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
    }

    const level = { value: 1 };
    const resources = { hp: 5, maxHp: 5 };
    const attributes = {
      strength: 1,
      dexterity: 1,
      intelligence: 1,
      vitality: 1,
      speed: randint(0, 3),
    };
    const hardCodedEnemy = () => new Enemy("Rat", level, resources, attributes);

    const amountOfEnemies = randint(2, 4);

    const enemyParty = [];
    for (let i = 0; i < amountOfEnemies; i++) {
      enemyParty.push(hardCodedEnemy());
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
}

export { CombatRoom };
export type { RoomOptions };
