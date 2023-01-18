import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import Floors from "../logic/Floors";

function registerFloorHandler(io: any, socket: Socket, client: Client): void {
  const getMainStoryFloors = () => {
    const emitData = Floors.mainStoryFloors;
    socket.emit("floors:main-story", emitData);
  };

  socket.on("floors:get-main-story", getMainStoryFloors);
}

export default registerFloorHandler;
