import { CombatRoom, RewardRoom } from "./Rooms";

class MainStoryZone {
  id: number;
  ilvl: number;
  name: string;
  rooms: Array<RewardRoom | CombatRoom>;
  currentLocation: number;
  constructor(id: number, name: string, ilvl: number) {
    this.id = id;
    this.ilvl = ilvl;
    this.name = name;
    // TODO: make a graph of rooms instead of an array
    this.currentLocation = 0;
    this.rooms = [
      new CombatRoom(0, "Old Cellar (floor 1)", ilvl),
      new RewardRoom(1, "Old Cellar (floor 2)", ilvl),
      new CombatRoom(2, "Old Cellar (floor 0)", ilvl),
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

  leaveRoom(): boolean {
    if (!this.currentRoom.completed) {
      return false;
    }
    this.currentLocation++;
    return true;
  }
}

export default MainStoryZone;
