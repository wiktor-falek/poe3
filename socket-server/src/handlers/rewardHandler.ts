import type Client from "../helpers/Client";
import type { Socket } from "socket.io";

function registerRewardHandler(io: any, socket: Socket, client: Client): void {
  const grantSilverTest = async () => {
    const room = client.instance?.zone?.currentRoom;
    if (!room || room.type !== "reward") return socket.emit("error");
    if (!room.claimReward()) return socket.emit("error");

    const silverAmount = 10;
    const result = await client.player.addSilver(silverAmount);
    if (!result.ok) {
      return socket.emit("error");
    }
    
    room.completed = true;

    return socket.emit("reward:silver-test", {
      silver: client.player.character.silver,
      items: [],
    });
  };

  socket.on("reward:get-silver-test", grantSilverTest);
}

export default registerRewardHandler;
