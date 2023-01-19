import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import { mainStoryFloorsData } from "../logic/Floors";

function registerFloorHandler(io: any, socket: Socket, client: Client): void {
  const getMainStoryFloors = () => {
    socket.emit("floors:main-story", mainStoryFloorsData);
  };

  socket.on("floors:get-main-story", getMainStoryFloors);
}

export default registerFloorHandler;
