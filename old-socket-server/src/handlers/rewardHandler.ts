import type Client from "../helpers/Client";
import type { Socket } from "socket.io";
import { CombatRoom, RewardRoom } from "../logic/Rooms";

function registerRewardHandler(io: any, socket: Socket, client: Client): void {
  const claimRoomReward = async () => {
    const room = client.instance?.zone?.currentRoom;
    if (!(room instanceof RewardRoom)) {
      return socket.emit("error", "Not a reward room");
    }

    const reward = room.claimReward();
    if (reward == null) {
      return socket.emit("error", "Reward has already been claimed");
    }

    // TODO: set completed in the room logic, for example when the combat ends
    room.completed = true;

    const { silver, items } = reward;
    if (silver) {
      const result = await client.characterModelProxy.awardSilver(silver);
      if (!result.ok) {
        return socket.emit("error");
      }
    }

    room.rewardClaimed = true;

    const xpGained = 9;
    const result = await client.characterModelProxy.awardXp(xpGained);

    socket.emit("reward:xp", result.value);

    socket.emit("reward:silver", {
      silver,
      totalSilver: client.character.silver,
    });
  };

  socket.on("reward:claim-room-reward", claimRoomReward);
}

export default registerRewardHandler;
