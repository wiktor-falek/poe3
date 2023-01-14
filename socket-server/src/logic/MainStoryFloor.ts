import Room from "./Room";

class MainStoryFloor {
  id: number;
  ilvl: number;
  rooms: Array<Room>;
  constructor(id: number, ilvl: number) { 
    this.id = id;
    this.ilvl = ilvl;
    this.rooms = [
      new Room("Old Cellar (floor 1)", ilvl),
      new Room("Old Cellar (floor 2)", ilvl),
    ];
  }
}

export default MainStoryFloor;
