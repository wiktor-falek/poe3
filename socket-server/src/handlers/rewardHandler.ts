import type Client from "../helpers/Client";
import type { Socket } from "socket.io";

function registerRewardHandler(io: any, socket: Socket, client: Client): void {
  const grantSilverTest = () => {
    const silverAmount = 10;
    socket.emit("room-reward:silver-test", silverAmount );
  }

  socket.on("room-reward:get-silver-test", grantSilverTest);
}

export default registerRewardHandler;
