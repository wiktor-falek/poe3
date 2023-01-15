<script lang="ts" setup>
import useSocketStore from "../../../stores/socketStore";
const socketStore = useSocketStore();
const socket = socketStore.socket;
</script>

<template>
  <h1>Town</h1>
  <p>Socket status: {{ socketStore.isConnected ? "connected" : "disconnected" }}</p>
</template>

<style scoped></style>
