import Enemy from "./Enemy";

type RoomType = "reward" | "combat";

interface RoomOptions {}

class Room {
  id: number;
  name: string;
  ilvl: number;
  completed: boolean;
  rewardClaimed: boolean;
  constructor(id: number, name: string, ilvl: number) {
    this.id = id;
    this.name = name;
    this.ilvl = ilvl;
    this.completed = false;
    this.rewardClaimed = false;
  }

  /**
   * If reward was already claimed returns false.
   * Otherwise sets rewardClaimed to true and returns true.
   */
  claimReward(): boolean {
    if (this.rewardClaimed) return false;
    this.rewardClaimed = true;
    return this.rewardClaimed;
  }
}

class RewardRoom extends Room {
  type: RoomType;
  constructor(id: number, name: string, ilvl: number) {
    super(id, name, ilvl);
    this.type = "reward";
  }
}

class CombatRoom extends Room {
  type: RoomType;
  initialized: boolean;
  enemies: Array<Enemy>;
  constructor(id: number, name: string, ilvl: number) {
    super(id, name, ilvl);
    this.type = "combat";
    this.enemies = [];
    this.initialized = false;
  }

  init(options?: RoomOptions): void {
    const hardCodedEnemy = () => new Enemy("Rat", this.ilvl);

    const amountOfEnemies = Math.floor(Math.random() * 3) + 1;

    const enemies = [];
    for (let i = 0; i < amountOfEnemies; i++) {
      enemies.push(hardCodedEnemy());
    }
    this.enemies = enemies;
    this.initialized = true;
  }
}

export { Room, RewardRoom, CombatRoom };
