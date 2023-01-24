import type Client from "../helpers/Client";
import type { Socket } from "socket.io";

function registerRewardHandler(io: any, socket: Socket, client: Client): void {
  const grantSilverTest = async () => {
    const silverAmount = 10;
    const result = await client.player.addSilver(silverAmount);
    if (result.ok) {
      return socket.emit("reward:silver-test", {
        silver: client.player.character.silver,
        items: [],
      });
    }
    return socket.emit("error");
  };

  socket.on("reward:get-silver-test", grantSilverTest);
}

export default registerRewardHandler;
