<script lang="ts" setup>
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import { useUserStore } from "../stores/userStore";
import { useRouter } from "vue-router";
import { onBeforeMount } from "vue";
import * as chat from "../socket/chat";

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
  chat.socket.connect();
});

onUnmounted(() => {
  chat.socket.disconnect();
});
</script>

<template>
  <!-- TODO: add loading animation -->
  <div class="loading" v-if="!chat.state.connected">Loading</div>

  <main v-else>
    <h1>Game</h1>
    <p>{{ userStore.characterName }}</p>
  </main>
</template>
