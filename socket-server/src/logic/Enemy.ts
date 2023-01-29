import { Level } from "../../*";

interface EnemyResources {
  maxHp: number;
  hp: number;
}

class Enemy {
  name: string;
  level: Level;
  resources: EnemyResources;

  #internalData: string = "";
  constructor(name: string, lvl: number) {
    this.name = name;
    this.level = {
      value: lvl,
    };
    this.resources = {
      maxHp: 10,
      hp: 10,
    };
  }
}

export default Enemy;
