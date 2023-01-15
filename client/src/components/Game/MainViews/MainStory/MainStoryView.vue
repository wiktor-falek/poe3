<script lang="ts" setup>
import useSocketStore from "../../../../stores/socketStore";
import ZoneSelect from "./components/ZoneSelect.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;



function joinZone(id: string) {
  console.log("joining zone ", id);
}
</script>

<template>
  <div class="main-story">
    <ZoneSelect @zone-select="(id) => joinZone(id)" />
  </div>
</template>

<style scoped>
.main-story {
  padding: 5px;
}
</style>
