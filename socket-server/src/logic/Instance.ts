import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
  availableRoomIds: Array<number>;
}

class Instance {
  zone: MainStoryZone;
  zoneId: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;
    this.zone = new MainStoryZone(0, "temp", 1);
    const zone = Zones.getZoneById(zoneId);
    if (zone === undefined) {
      throw new Error(`Floor does not exist (zoneId=${zoneId})`);
    }
    this.zone = zone;
  }

  public get data(): InstanceData {
    const ilvl = this.zone.ilvl;
    const currentLocation = this.zone.currentLocation;
    const rooms = this.zone.rooms.map((room: any) => {
      return { name: room.name };
    });
    const availableRoomIds: number[] = [1]; // TODO: unhardcode and return valid room choices

    return { ilvl, currentLocation, rooms, availableRoomIds };
  }

  joinRoom(roomNumber: number) {
    const currentRoom = this.zone.currentRoom;
    return currentRoom;
  }
}

export default Instance;
