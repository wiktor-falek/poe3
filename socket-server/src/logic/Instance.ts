import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
  validRoomChoices: Array<number>;
}

class Instance {
  zone: MainStoryZone;
  zoneId: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;

    const zone = Zones.createZone(zoneId);
    if (zone === null) {
      throw new Error(`Zone does not exist (zoneId=${zoneId})`);
    }
    this.zone = zone;
  }

  public get data(): InstanceData {
    const ilvl = this.zone.ilvl;
    const currentLocation = this.zone.currentLocation;
    const rooms = this.zone.rooms.map((room: any) => {
      return { name: room.name, type: room.type }; // TODO: add ids to the rooms
    });
    const validRoomChoices = this.zone.validRoomChoices;

    return { ilvl, currentLocation, rooms, validRoomChoices };
  }

  getCurrentRoom(roomNumber: number) {
    const currentRoom = this.zone.currentRoom;
    return currentRoom;
  }
}

export default Instance;
