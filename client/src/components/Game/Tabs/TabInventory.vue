<script setup>
import CharacterOverview from "./InventoryComponents/CharacterOverview.vue";
import CharacterInventory from "./InventoryComponents/CharacterInventory.vue";
import Money from "../Other/Money.vue";
import CharacterEquipment from "./InventoryComponents/CharacterEquipment.vue";
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();
const characterData = playerStore.characterData;
</script>

<template>
  <div class="tab" v-if="characterData">
    <CharacterOverview
      :name="characterData.name"
      :playerClass="characterData.class"
      :level="characterData.level.value"
      :hp="characterData.resources.hp"
      :maxHp="characterData.resources.maxHp"
      :mp="characterData.resources.mp"
      :maxMp="characterData.resources.maxMp"
    />

    <CharacterEquipment :equipment="characterData.equipment" />
    <Money />
    <CharacterInventory />
  </div>
</template>

<style scoped>
.tab {
  justify-content: space-between;
}

.money {
  margin-left: auto;
  width: 150px;
  display: flex;
  justify-content: end;
  padding: 0px 5px;
}
</style>
