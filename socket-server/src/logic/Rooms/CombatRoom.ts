import Enemy from "../Enemy";
import { Room } from "./Room";
import type { RoomType } from "./Room";

interface RoomOptions {}

class CombatRoom extends Room {
  type: RoomType;
  initialized: boolean;
  allyParty: Array<any>;
  enemyParty: Array<Enemy>;
  constructor(id: number, name: string, ilvl: number) {
    super(id, name, ilvl);
    this.type = "combat";
    this.allyParty = [];
    this.enemyParty = [];
    this.initialized = false;
  }

  // All of this is logic is contained here because when a Zone is instantiated
  // 1. there will be a lot of rooms
  // 2. during a run there might be a lot of different variables that change behavior
  // 3. saves a bit of computing power, which is likely to be the bottleneck
  init(characters: Array<any>, options?: RoomOptions): void {
    const hardCodedEnemy = () => new Enemy("Rat", this.ilvl);

    const amountOfEnemies = Math.floor(Math.random() * 3) + 1;

    const enemies = [];
    for (let i = 0; i < amountOfEnemies; i++) {
      enemies.push(hardCodedEnemy());
    }
    this.enemyParty = enemies;
    this.allyParty = [...characters];
    this.initialized = true;
  }
}

export { CombatRoom };
export type { RoomOptions }