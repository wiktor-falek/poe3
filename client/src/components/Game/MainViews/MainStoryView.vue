<script lang="ts" setup>
import useSocketStore from "../../../stores/socketStore";
const socketStore = useSocketStore();
const socket = socketStore.socket;
</script>

<template>
  <h1>Main Story</h1>
  <p>Socket status: {{ socket.connected ? "connected" : "disconnected" }}</p>
</template>

<style scoped></style>
