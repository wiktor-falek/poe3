<script lang="ts" setup>
import { ref, Ref } from "vue";
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";

const playerStore = usePlayerStore();
const socketStore = useSocketStore();
const socket = socketStore.socket;

const emit = defineEmits(["leaveRoom"]);

const rewardIsClaimed: Ref<boolean> = ref(false);
const leaveButtonIsVisible: Ref<boolean> = ref(false);
// TODO:
function handleClick() {
  socket.emit("reward:get-silver-test");
  rewardIsClaimed.value = true;
}

socket.on("reward:silver-test", (data) => {
  // display rewards
  const { silver, items } = data;
  playerStore.setSilver(silver);
  console.log(data);
  rewardIsClaimed.value = true;
  leaveButtonIsVisible.value = true;
});

// TODO: PROCEED
function leaveRoomHandle() {
  if (!rewardIsClaimed) return;
  socket.emit("instance:leave-room")
}

socket.on("instance:has-left-room", (leftSuccessfully) => {
  console.log("HERE");
  console.log({leftSuccessfully});
  if (!leftSuccessfully) {
    return console.log("u cant")
  }
  emit('leaveRoom');
})
</script>

<template>
  <div class="chest" v-if="!rewardIsClaimed" @click="handleClick">
    *Reward Chest*
  </div>
  <div class="chest" v-else>*Looted Reward Chest*</div>
  <button @click="leaveRoomHandle" v-if="leaveButtonIsVisible">Leave Room</button>
</template>

<style scoped>
.chest {
}
</style>
