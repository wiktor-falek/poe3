import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
  validRoomChoices: Array<number> | null;
}

class Instance {
  zone: MainStoryZone | null;
  zoneId: number;
  constructor(zoneId: number) {
    this.zoneId = zoneId;
    this.zone = Zones.createZone(zoneId);
  }

  public get data(): InstanceData | null {
    if (this.zone === null) return null;
    const ilvl = this.zone.ilvl;
    const currentLocation = this.zone.currentLocation;
    const rooms = this.zone.rooms.map((room: any) => {
      return { name: room.name, type: room.type, id: room.id };
    });

    return {
      ilvl,
      currentLocation,
      rooms,
      validRoomChoices: this.validRoomChoices,
    };
  }

  public get currentRoom() {
    if (this.zone === null) return null;
    const currentRoom = this.zone.currentRoom;
    return currentRoom;
  }

  /**
   * Returns ids of rooms that player can proceed to
   */
  public get validRoomChoices(): number[] | null {
    return this.zone?.validRoomChoices || null;
  }
}

export default Instance;
