<script lang="ts" setup>
import { onUnmounted } from "vue";
import { onMounted } from "vue";
import { socket } from "../socket";

onMounted(() => {
  socket.connect();
});

onUnmounted(() => {
  socket.disconnect();
});
</script>

<template>
  <h1>Game</h1>
</template>
