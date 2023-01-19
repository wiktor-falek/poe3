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
      new Room("Old Cellar (level 1)", ilvl),
      new Room("Old Cellar (level 2)", ilvl),
    ];
  }

  public get currentRoom(): Room {
    return this.rooms[this.currentLocation];
  }

  public get validRoomChoices(): Array<any> {
    return [];
  }
}

export default MainStoryZone;