import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import Zones from "../logic/Zones";

function registerFloorHandler(io: any, socket: Socket, client: Client): void {
  const getMainStoryZones = () => {
    socket.emit("zones:main-story", Zones.mainStoryData);
  };

  socket.on("zones:get-main-story", getMainStoryZones);
}

export default registerFloorHandler;
