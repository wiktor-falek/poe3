type RoomType = "reward" | "combat";

interface Reward {
  silver?: number;
  items?: Array<any>;
}

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
   * If reward was already claimed returns null.
   * Otherwise sets rewardClaimed to true and returns Reward.
   */
  claimReward(): Reward | null {
    const silver = Math.floor(Math.random() * (12 - 6) + 6); // TODO: finish random library
    if (this.rewardClaimed) return null;

    const reward: Reward = { silver };
    this.rewardClaimed = true;
    return reward;
  }
}

export { Room };
export type { RoomType };
