import Zones from "./Zones";
import MainStoryZone from "./MainStoryZone";
import Party from "../helpers/Party";

class Instance {
  party: Party;
  zone: MainStoryZone | null;
  constructor(zoneId: number, party: Party) {
    this.party = party;
    this.zone = Zones.createZone(zoneId);
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
      party: this.party.publicData,
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
