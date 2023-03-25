import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";
import type Client from "../helpers/Client";

interface InstanceData {
  rooms: Array<Object>;
  currentLocation: number;
  zoneLvl: number;
  validRoomChoices: Array<number> | null;
}

class Instance {
  clients: { [characterId: string]: Client };
  partyLeader: string;
  zone: MainStoryZone | null;
  zoneId: number;
  constructor(zoneId: number, client: Client, partyLeaderCharacterId: string) {
    this.clients = {};
    this.partyLeader = partyLeaderCharacterId;
    this.zoneId = zoneId;
    this.join(client);
    this.zone = Zones.createZone(zoneId);
  }

  join(client: Client) {
    this.clients[client.character.id] = client;
  }

  leave(client: Client) {
    delete this.clients[client.character.id];
  }

  public get data(): InstanceData | null {
    if (this.zone === null) return null;
    const zoneLvl = this.zone.zoneLvl;
    const currentLocation = this.zone.currentLocation;
    const rooms = this.zone.rooms.map((room: any) => {
      return { name: room.name, type: room.type, id: room.id };
    });

    return {
      zoneLvl,
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
  public get validRoomChoices(): number[] {
    const roomsIds = this.zone?.validRoomChoices ?? [];
    return roomsIds;
  }
}

export default Instance;
