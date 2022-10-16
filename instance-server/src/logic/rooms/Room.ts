export type RoomTypes = "Combat" | "Reward";

class Room {
  roomType: RoomTypes;
  enemies: any[]; // for now
  constructor(roomType: RoomTypes) {
    this.roomType = "Combat";
    this.enemies = [];
  }
}

export default Room;
