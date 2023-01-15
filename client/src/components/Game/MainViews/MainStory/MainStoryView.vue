<script lang="ts" setup>
import useSocketStore from "../../../../stores/socketStore";
import ZoneSelect from "./components/ZoneSelect.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;
</script>

<template>
  <div class="main-story">
    <h1>Main Story</h1>
    <p>Socket status: {{ socket.connected ? "connected" : "disconnected" }}</p>
    <ZoneSelect />
  </div>
</template>

<style scoped>
.main-story {
  padding: 5px;
}
</style>
