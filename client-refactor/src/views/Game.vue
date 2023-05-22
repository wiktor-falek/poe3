<script lang="ts" setup>
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import { socket } from "../socket";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";

const userStore = useUserStore();
const router = useRouter();

onBeforeMount(() => {
  // if no character is selected redirect to selection view
  if (!userStore.characterName) {
    router.push("/select");
  }
});

onMounted(() => {
  // connect to the socket server using userStore.characterName character
  // socket.connect();
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<template>
  <h1>Game</h1>
  <p>{{ userStore.characterName }}</p>
</template>
