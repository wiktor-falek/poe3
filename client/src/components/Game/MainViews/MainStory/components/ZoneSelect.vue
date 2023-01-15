<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { usePlayerStore } from "../../../../../stores/playerStore";

const playerStore = usePlayerStore();
const highestFloorId = computed(
  () => playerStore.characterData.progression.mainStory.highestFloorId
);

const zones = new Map([
  [1, { name: "Old cellar", ilvl: 1 }],
  [2, { name: "Test zone", ilvl: 2 }],
  [3, { name: "Test zone", ilvl: 3 }],
  [4, { name: "Test zone", ilvl: 4 }],
  [5, { name: "Test zone", ilvl: 5 }],
  [6, { name: "Test zone", ilvl: 6 }],
  [7, { name: "Test zone", ilvl: 7 }],
  [8, { name: "Test zone", ilvl: 8 }],
  [9, { name: "Test zone", ilvl: 9 }],
  [10, { name: "Test zone", ilvl: 10 }],
]);
</script>

<template>
  <div class="zone-select">
    <div
      class="zone"
      :class="{ locked: id > highestFloorId }"
      v-for="[id, zone] in zones.entries()"
    >
      {{ zone.name }} (zone lvl {{ zone.ilvl }})
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
  padding: 5px;
  font-size: 1.4rem;
}

.zone-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 554px;
  overflow: scroll;
  padding: 10px;
  border: 2px solid gray;
  border-radius: 20px;
}

.locked {
  background-color: rgb(40, 40, 40);
}
</style>
