class Enemy {
  name: string;
  lvl: number;
  hp: number;

  #internalData: string = "";
  constructor(name: string, lvl: number) {
    this.name = name;
    this.lvl = lvl;
    this.hp = 10;
  }
}

export default Enemy;
