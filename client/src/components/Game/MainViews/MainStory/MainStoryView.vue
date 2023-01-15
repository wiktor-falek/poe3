<script lang="ts" setup>
import useSocketStore from "../../../../stores/socketStore";
import ZoneSelect from "./components/ZoneSelect.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;
</script>

<template>
  <div class="main-story">
    <ZoneSelect />
  </div>
</template>

<style scoped>
.main-story {
  padding: 5px;
}
</style>
