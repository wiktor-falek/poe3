import Enemy from "./Enemy";

interface RoomOptions {}

class Room {
  name: string;
  ilvl: number;
  enemies: Array<Enemy>;
  constructor(name: string, ilvl: number) {
    this.name = name;
    this.ilvl = ilvl;
    this.enemies = [];
  }

  init(options?: RoomOptions): void {
    const hardCodedEnemy = () => new Enemy("Rat", this.ilvl);

    this.enemies.push(hardCodedEnemy());
    this.enemies.push(hardCodedEnemy());
  }
}

export default Room;
