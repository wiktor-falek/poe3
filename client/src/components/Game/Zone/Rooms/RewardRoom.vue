<script lang="ts" setup>
import { ref, Ref } from "vue";
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";

const playerStore = usePlayerStore();
const socketStore = useSocketStore();
const socket = socketStore.socket;

const rewardIsClaimed: Ref<boolean> = ref(false);
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
  
});
</script>

<template>
  <div class="chest" v-if="!rewardIsClaimed" @click="handleClick">
    *Reward Chest*
  </div>
  <div class="chest" v-else>*Looted Reward Chest*</div>
</template>

<style scoped>
.chest {
}
</style>
