import Enemy from "./Enemy";

interface RoomOptions {}
type RoomType = "combat" | "reward";

class Room {
  name: string;
  type: RoomType;
  ilvl: number;
  enemies: Array<Enemy>;
  initialized: boolean;
  completed: boolean;
  constructor(name: string, type: RoomType, ilvl: number) {
    this.name = name;
    this.type = "reward"; //
    this.ilvl = ilvl;
    this.enemies = [];
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
