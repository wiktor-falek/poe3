<script lang="ts" setup>
import { ref, Ref } from "vue";
import useSocketStore from "../../../../stores/socketStore";
const socketStore = useSocketStore();
const socket = socketStore.socket;

const rewardIsClaimed: Ref<boolean> = ref(false);
// TODO:
function handleClick() {
  socket.emit("room-reward:get-silver-test");
  rewardIsClaimed.value = true; // TODO: implement event listener on the server
}

socket.on("room-reward:silver-test", (data) => {
  // display rewards
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
