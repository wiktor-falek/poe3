import Enemy from "./combat/Enemy";

type RoomType = "reward" | "combat";

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
   * If reward was already claimed returns false.
   * Otherwise sets rewardClaimed to true and returns true.
   */
  claimReward(): boolean {
    if (this.rewardClaimed) return false;
    this.rewardClaimed = true;
    return this.rewardClaimed;
  }
}


export default Room;
