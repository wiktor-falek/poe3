import { CombatRoom, RewardRoom } from "./Rooms";

class MainStoryZone {
  id: number;
  zoneLvl: number;
  name: string;
  rooms: Array<RewardRoom | CombatRoom>;
  currentLocation: number;
  constructor(id: number, name: string, zoneLvl: number) {
    this.id = id;
    this.zoneLvl = zoneLvl;
    this.name = name;
    // TODO: make a graph of rooms instead of an array
    this.currentLocation = 0;
    this.rooms = [
      // new RewardRoom(0, "Old Cellar (floor 2)", zoneLvl),
      new RewardRoom(0, "Old Cellar (floor 1)", zoneLvl),
      new CombatRoom(1, "Old Cellar (floor 0)", zoneLvl),
    ];
  }

  public get currentRoom(): RewardRoom | CombatRoom {
    return this.rooms[this.currentLocation];
  }

  public get validRoomChoices(): Array<number> {
    // returns ids of the rooms that the player can proceed to (if current room is completed)

    const validRooms = [this.currentRoom.id];
    return validRooms;
  }

  joinRoom(roomId: number): RewardRoom | CombatRoom | null {
    if (
      !this.validRoomChoices?.includes(roomId) ||
      !this.currentRoom?.completed
    ) {
      return null;
    }
    this.currentLocation++;
    return this.currentRoom;
  }
}

export default MainStoryZone;
