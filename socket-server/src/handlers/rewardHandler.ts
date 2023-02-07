import type Client from "../helpers/Client";
import type { Socket } from "socket.io";

function registerRewardHandler(io: any, socket: Socket, client: Client): void {
  const claimRoomReward = async () => {
    const room = client.instance?.zone?.currentRoom;
    if (!room || room.type !== "reward") return socket.emit("error");

    const reward = room.claimReward();
    if (reward === null) {
      return socket.emit("error");
    }

    const { silver, items } = reward;
    if (silver) {
      const result = await client.playerModel.addSilver(silver);
      if (!result.ok) {
        return socket.emit("error");
      }
    }

    room.completed = true;

    return socket.emit("reward:silver-test", {
      silver,
      items,
      totalSilver: client.playerModel.character.silver,
    });
  };

  socket.on("reward:get-silver-test", claimRoomReward);
}

export default registerRewardHandler;
