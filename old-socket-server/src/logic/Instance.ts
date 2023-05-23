import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";
import { nanoid } from "nanoid";
import Client from "../helpers/Client";

class Instance {
  socketRoomId: string;
  zone: MainStoryZone | null;
  clients: { [characterId: string]: Client };
  constructor(zoneId: number) {
    this.socketRoomId = "instance:" + nanoid();
    this.zone = Zones.createZone(zoneId);
    this.clients = {};
  }

  join(client: Client) {
    this.clients[client.character.id] = client;
  }

  leave(client: Client) {
    delete this.clients[client.character.id];
  }

  // leave(client: Client) {
  //   delete this.party.clients[client.character.id];
  // }

  public get data() {
    if (this.zone === null) return null;

    const rooms = this.zone.rooms.map((room: any) => {
      return { name: room.name, type: room.type, id: room.id };
    });

    return {
      rooms,
      zoneLvl: this.zone.zoneLvl,
      currentLocation: this.zone.currentLocation,
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
