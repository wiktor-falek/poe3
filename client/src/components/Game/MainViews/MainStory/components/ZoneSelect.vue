<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { usePlayerStore } from "../../../../../stores/playerStore";

const playerStore = usePlayerStore();
const highestFloorId = computed(
  () => playerStore.characterData.progression.mainStory.highestFloorId
);

const zones = new Map([
  [1, { name: "Old cellar" }],
  [2, { name: "Test zone" }],
  [3, { name: "Test zone" }],
  [4, { name: "Test zone" }],
  [5, { name: "Test zone" }],
  [6, { name: "Test zone" }],
  [7, { name: "Test zone" }],
  [8, { name: "Test zone" }],
  [9, { name: "Test zone" }],
  [10, { name: "Test zone" }],
]);
</script>

<template>
  <div class="zone-select">
    <div
      class="zone"
      :class="{ locked: id > highestFloorId }"
      v-for="[id, zone] in zones.entries()"
    >
      {{ zone.name }} ({{ id }})
    </div>
  </div>
</template>

<style scoped>
.zone {
  width: 100%;
  height: 80px;
  background-color: rgb(66, 66, 66);
  border-radius: 10px;
  flex-shrink: 0;
}

.zone-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 650px;
  overflow: scroll;
  padding: 10px;
  border: 2px solid gray;
  border-radius: 20px;
}

.locked {
  background-color: rgb(40, 40, 40);
}
</style>
