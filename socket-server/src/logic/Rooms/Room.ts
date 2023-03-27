import Client from "../../helpers/Client";

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
    // TODO: rewrite this to keep track which character has claimed reward
    this.rewardClaimed = false;
  }
}

export { Room };
export type { RoomType };
