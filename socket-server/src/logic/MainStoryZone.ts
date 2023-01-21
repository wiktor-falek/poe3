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
      new Room("Old Cellar (level 1)", "combat",  ilvl),
      new Room("Old Cellar (level 2)", "combat",  ilvl),
    ];
  }

  public get currentRoom(): Room {
    return this.rooms[this.currentLocation];
  }

  public get validRoomChoices(): Array<number> {
    // returns ids of the rooms that the player can proceed to (if current room is completed)
    const currentRoom = this.currentRoom;

    const validRoomChoices: Array<number> = [];
    if (currentRoom.completed) {
      return [1]; // TODO: unhardcode
    }
    return validRoomChoices;
  }
}

export default MainStoryZone;
