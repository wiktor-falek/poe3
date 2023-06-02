<script setup>
import CharacterOverview from "./InventoryComponents/CharacterOverview.vue";
import CharacterInventory from "./InventoryComponents/CharacterInventory.vue";
import Money from "../Other/Money.vue";
import CharacterEquipment from "./InventoryComponents/CharacterEquipment.vue";
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();
const character = playerStore.character;
</script>

<template>
  <div class="tab" v-if="character">
    <CharacterOverview
      :name="character.name"
      :playerClass="character.class"
      :level="character.level.value"
      :hp="character.resources.hp"
      :maxHp="character.resources.maxHp"
      :mp="character.resources.mp"
      :maxMp="character.resources.maxMp"
    />

    <CharacterEquipment :equipment="character.equipment" />
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
