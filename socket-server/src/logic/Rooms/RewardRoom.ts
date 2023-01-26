import { Room, RoomType } from "./Room";

class RewardRoom extends Room {
  type: RoomType;
  constructor(id: number, name: string, ilvl: number) {
    super(id, name, ilvl);
    this.type = "reward";
  }
}

export default RewardRoom;