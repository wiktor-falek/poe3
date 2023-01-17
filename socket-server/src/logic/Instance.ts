import MainStoryFloor from "./MainStoryFloor";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
}

class Instance {
  floor: MainStoryFloor;
  zoneId: number;
  currentLocation: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;
    this.floor = new MainStoryFloor(1, 1);
    this.currentLocation = 0;
  }

  public get instanceData(): InstanceData {
    const ilvl = this.floor.ilvl;
    const currentLocation = this.currentLocation;
    const rooms = this.floor.rooms.map((room) => {
      return { name: room.name };
    });

    return { ilvl, currentLocation, rooms };
  }

  joinRoom() {
    const currentRoom = this.floor.rooms[this.currentLocation];
  }
}

export default Instance;
