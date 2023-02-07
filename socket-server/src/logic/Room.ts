import Enemy from "./combat/Enemy";

type RoomType = "reward" | "combat";

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


export default Room;
