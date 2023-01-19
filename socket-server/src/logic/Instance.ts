import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
  availableRoomIds: Array<number>;
}

class Instance {
  floor: MainStoryZone;
  zoneId: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;
    this.floor = new MainStoryZone(0, "temp", 1);
    const floor = Zones.getFloorById(zoneId);
    if (floor === undefined) {
      throw new Error(`Floor does not exist (zoneId=${zoneId})`);
    }
    this.floor = floor;
  }

  public get data(): InstanceData {
    const ilvl = this.floor.ilvl;
    const currentLocation = this.floor.currentLocation;
    const rooms = this.floor.rooms.map((room: any) => {
      return { name: room.name };
    });
    const availableRoomIds: number[] = [1]; // TODO: unhardcode and return valid room choices

    return { ilvl, currentLocation, rooms, availableRoomIds };
  }

  joinRoom(roomNumber: number) {
    const currentRoom = this.floor.currentRoom;
    return currentRoom;
  }
}

export default Instance;
