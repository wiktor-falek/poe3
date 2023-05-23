import { randint } from "pyrand";
import { Room, RoomType } from "./Room";


interface Reward {
  silver?: number;
  items?: Array<any>;
}

class RewardRoom extends Room {
  type: RoomType;
  constructor(id: number, name: string, zoneLvl: number) {
    super(id, name, zoneLvl);
    this.type = "reward";
    this.completed = true;
  }

  claimReward(): Reward | null {
    if (this.rewardClaimed) return null;

    const silver = randint(25, 30);
    const reward: Reward = { silver };
    return reward;
  }

}

export default RewardRoom;