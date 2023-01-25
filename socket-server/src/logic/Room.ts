import Enemy from "./Enemy";

interface RoomOptions {}
type RoomType = "combat" | "reward";

class Room {
  id: number;
  name: string;
  type: RoomType;
  ilvl: number;
  enemies: Array<Enemy>;
  initialized: boolean;
  completed: boolean;
  constructor(id: number, name: string, type: RoomType, ilvl: number) {
    this.id = id;
    this.name = name;
    this.type = type;
    this.ilvl = ilvl;
    this.enemies = []; // move to CombatRoom
    // static get reward // add to RewardRoom
    this.initialized = false;
    this.completed = false;
  }

  init(options?: RoomOptions): void {
    const hardCodedEnemy = () => new Enemy("Rat", this.ilvl);

    this.enemies.push(hardCodedEnemy());
    this.enemies.push(hardCodedEnemy());

    this.initialized = true;
  }
}

export default Room;
