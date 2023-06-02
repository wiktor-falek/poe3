<script lang="ts" setup>
import { ref, Ref } from "vue";
import { useMessageStore } from "../../../../stores/messageStore";
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";

const playerStore = usePlayerStore();

const socketStore = useSocketStore();
const socket = socketStore.socket;

const messageStore = useMessageStore();

const emit = defineEmits(["leaveRoom", "abandonRun"]);

const rewardIsClaimed: Ref<boolean> = ref(false);
const leaveButtonIsVisible: Ref<boolean> = ref(false);
const silverGained: Ref<number> = ref(0);

function handleClick() {
  socket.emit("reward:claim-room-reward");
  rewardIsClaimed.value = true;
}

socket.off("reward:silver");
socket.on("reward:silver", (data) => {
  // display rewards
  const { totalSilver, silver } = data;
  playerStore.setSilver(totalSilver);
  silverGained.value = silver;
  rewardIsClaimed.value = true;
  leaveButtonIsVisible.value = true;
  // TODO: format to gold and silver
  messageStore.pushClientSideSystemMessage(`You received ${silver} silver`);
});

socket.off("reward:xp");
socket.on("reward:xp", (data) => {
  const { level, xpGained } = data;
  playerStore.setLevel(level, xpGained);
});

function leaveRoomHandle() {
  socket.emit("instance:leave-room");
}

socket.on("instance:has-left-room", (leftSuccessfully) => {
  if (!leftSuccessfully) {
    messageStore.pushClientSideSystemMessage("Room is not completed")
    return;
  }
  emit("leaveRoom");
});
</script>

<template>
  <div class="wrapper">
    <div class="ui">
      <button class="button" @click="emit('abandonRun')">Abandon Run</button>
    </div>
    <div class="reward-room">
      <div class="chest" v-if="!rewardIsClaimed" @click="handleClick">
        *Reward Chest*
      </div>
      <div class="chest" v-else>You received {{ silverGained }} silver</div>
      <button class="button" @click="leaveRoomHandle" v-if="leaveButtonIsVisible">
        Proceed
      </button>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  height: 100%;
}
.reward-room {
  display: flex;
  align-items: center;
  justify-content: center;
}
.chest {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 150px;
  width: 250px;
  border: 1px solid white;
}
</style>
