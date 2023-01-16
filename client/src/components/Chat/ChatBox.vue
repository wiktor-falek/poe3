<script lang="ts" setup>
import useSocketStore from '../../stores/socketStore';

const socketStore = useSocketStore();
const socket = socketStore.socket;
</script>

<template>
  <div class="chat">
    <p>STATUS: {{ socketStore.isConnected ? `CONNECTED` : "DISCONNECTED" }}</p>
    <p v-if="socketStore.isConnected">PING: {{ socketStore.ping }}</p>
  </div>
</template>

<style scoped>
.chat {
  border: 2px solid rgb(217, 212, 212);
  width: 100%;
  height: 100%;
}
</style>