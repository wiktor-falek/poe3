<script lang="ts" setup>
import { ref, Ref } from "vue";
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";

const playerStore = usePlayerStore();
const socketStore = useSocketStore();
const socket = socketStore.socket;

const emit = defineEmits(["leaveRoom", "abandonRun"]);

const rewardIsClaimed: Ref<boolean> = ref(false);
const leaveButtonIsVisible: Ref<boolean> = ref(false);
const silverGained: Ref<number> = ref(0);
  
function handleClick() {
  socket.emit("reward:get-silver-test");
  rewardIsClaimed.value = true;
}

socket.on("reward:silver-test", (data) => {
  // display rewards
  const { totalSilver, silver, items } = data;
  playerStore.setSilver(totalSilver);
  silverGained.value = silver;
  rewardIsClaimed.value = true;
  leaveButtonIsVisible.value = true;
  // TODO: ClientSideSystemMessage
});

// TODO: PROCEED
function leaveRoomHandle() {
  if (!rewardIsClaimed) return;
  socket.emit("instance:leave-room");
}

socket.on("instance:has-left-room", (leftSuccessfully) => {
  if (!leftSuccessfully) {
    return console.log("u cant");
  }
  emit("leaveRoom");
});
</script>

<template>
  <button @click="emit('abandonRun')">Abandon Run</button>
  <div class="reward-room">
    <div class="chest" v-if="!rewardIsClaimed" @click="handleClick">
      *Reward Chest*
    </div>
    <div class="chest" v-else>You received {{ silverGained }} silver</div>
    <button @click="leaveRoomHandle" v-if="leaveButtonIsVisible">
      Proceed
    </button>
  </div>
</template>

<style scoped>
.reward-room {
  width: 100%;
  height: 100%;
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
  border: 2px solid white;
}
</style>
