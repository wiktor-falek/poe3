import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";
import { CombatRoom, RewardRoom } from "./Rooms";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  ilvl: number;
  validRoomChoices: Array<number> | null;
}

class Instance {
  characterName: string;
  zone: MainStoryZone | null;
  zoneId: number;
  constructor(zoneId: number, characterName: string) {
    this.characterName = characterName;
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

  public get currentRoom(): CombatRoom | RewardRoom | null {
    if (this.zone === null) return null;
    const currentRoom = this.zone.currentRoom;
    return currentRoom;
  }

  /**
   * Returns ids of rooms that player can proceed to
   */
  public get validRoomChoices(): number[] {
    const roomsIds = this.zone?.validRoomChoices ?? [];
    return roomsIds;
  }
}

export default Instance;
