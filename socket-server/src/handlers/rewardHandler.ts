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

    // TODO: this should be inside claimReward() method
    room.completed = true;

    const { silver, items } = reward;
    if (silver) {
      const result = await client.characterModelProxy.awardSilver(silver);
      console.log(result);
      if (!result.ok) {
        return socket.emit("error");
      }
    }

    // const result = await client.characterModelProxy.awardXp(9);
    // if (result.ok) {
    //   socket.emit("reward:xp", result.value);
    // }
    const xpGained = 9;
    const result = await client.characterModelProxy.awardXp(xpGained);

    socket.emit("reward:xp", result.value);

    socket.emit("reward:silver", {
      silver,
      totalSilver: client.characterModelProxy.character.silver,
    });
  };

  socket.on("reward:claim-room-reward", claimRoomReward);
}

export default registerRewardHandler;
