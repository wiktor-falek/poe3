import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import Zones from "../logic/Zones";
import { CharacterProgression } from "../../*";

function registerFloorHandler(io: any, socket: Socket, client: Client): void {
  const getMainStoryZones = () => {
    const { party } = client;

    const charactersProgression: {
      [characterName: string]: number;
    } = {};

    for (const client of Object.values(party.clients)) {
      charactersProgression[client.character.name] =
        client.character.progression.mainStory.highestZoneId;
    }
    socket.emit("zones:main-story", Zones.mainStoryData, charactersProgression);
  };

  socket.on("zones:get-main-story", getMainStoryZones);
}

export default registerFloorHandler;
