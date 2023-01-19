import Enemy from "./Enemy";

interface RoomOptions {}

class Room {
  name: string;
  ilvl: number;
  enemies: Array<Enemy>;
  initialized: boolean;
  completed: boolean;
  constructor(name: string, ilvl: number) {
    this.name = name;
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
