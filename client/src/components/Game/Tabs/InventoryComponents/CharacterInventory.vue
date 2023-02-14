<script setup>
import { usePlayerStore } from "../../../../stores/playerStore";
import CharacterEquipmentSlot from "./CharacterEquipmentSlot.vue";

const playerStore = usePlayerStore();
const inventory = playerStore.characterData.inventory;
</script>

<template>
  <div class="inventory">
    <div class="inventory__slot" v-for="idx in 32">
      <CharacterEquipmentSlot :item="inventory[idx-1]" />
    </div>
  </div>
</template>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; /* fr fr no cap */
  border: 1px solid grey;
  gap: 1px;
  background-color: grey;
}

.inventory__slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: rgb(28, 28, 28);
}
</style>
