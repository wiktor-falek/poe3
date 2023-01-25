import Room from "./Room";

class MainStoryZone {
  id: number;
  ilvl: number;
  name: string;
  rooms: Array<Room>;
  currentLocation: number;
  constructor(id: number, name: string, ilvl: number) {
    this.id = id;
    this.ilvl = ilvl;
    this.name = name;
    this.currentLocation = 0;
    this.rooms = [
      new Room(0, "Old Cellar (level 1)", "reward", ilvl),
      new Room(1, "Old Cellar (level 2)", "combat", ilvl),
    ];
  }

  public get currentRoom(): Room {
    return this.rooms[this.currentLocation];
  }

  public get validRoomChoices(): Array<number> {
    // returns ids of the rooms that the player can proceed to (if current room is completed)

    const validRooms = [this.currentRoom.id];
    return validRooms;
  }

  joinRoom(roomId: number): Room | null {
    if (
      !this.validRoomChoices?.includes(roomId) ||
      !this.currentRoom?.completed
    ) {
      return null;
    }
    // TODO: unhardcode
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
