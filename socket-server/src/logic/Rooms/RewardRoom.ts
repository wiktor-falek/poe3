import { Room, RoomType } from "./Room";

class RewardRoom extends Room {
  type: RoomType;
  constructor(id: number, name: string, zoneLvl: number) {
    super(id, name, zoneLvl);
    this.type = "reward";
  }
}

export default RewardRoom;