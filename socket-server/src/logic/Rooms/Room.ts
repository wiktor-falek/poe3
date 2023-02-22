import { randint } from "pyrand";

type RoomType = "reward" | "combat";

interface Reward {
  silver?: number;
  items?: Array<any>;
}

class Room {
  id: number;
  name: string;
  zoneLvl: number;
  completed: boolean;
  rewardClaimed: boolean;
  constructor(id: number, name: string, zoneLvl: number) {
    this.id = id;
    this.name = name;
    this.zoneLvl = zoneLvl;
    this.completed = false;
    this.rewardClaimed = false;
  }

  /**
   * If reward was already claimed returns null.
   * Otherwise sets rewardClaimed to true and returns Reward.
   */
  claimReward(): Reward | null {
    if (this.rewardClaimed) return null;

    const silver = randint(25, 30);
    const reward: Reward = { silver };
    this.rewardClaimed = true;
    return reward;
  }
}

export { Room };
export type { RoomType };
