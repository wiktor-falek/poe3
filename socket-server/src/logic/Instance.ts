import Floors from "./Floors";
import MainStoryFloor from "./MainStoryFloor";


interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
  availableRoomIds: Array<number>;
}

class Instance {
  floor: MainStoryFloor;
  zoneId: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;
    this.floor = new MainStoryFloor(0, "temp", 1);
    // this.floor = Floors.getFloorById(zoneId)!; // TODO: might be undefined 
  }

  public get instanceData(): InstanceData {
    const ilvl = this.floor.ilvl;
    const currentLocation = this.floor.currentLocation;
    const rooms = this.floor.rooms.map((room) => {
      return { name: room.name };
    });
    const availableRoomIds: number[] = []; // TODO

    return { ilvl, currentLocation, rooms, availableRoomIds };
  }

  joinRoom(roomNumber: number) {
    const currentRoom = this.floor.currentRoom;
    return currentRoom;
  }
}

export default Instance;
