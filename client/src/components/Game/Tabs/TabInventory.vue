<script setup>
import CharacterOverview from "./InventoryComponents/CharacterOverview.vue";
import CharacterEquipment from "./InventoryComponents/CharacterEquipment.vue";
import CharacterInventory from "./InventoryComponents/CharacterInventory.vue";
import Money from "../Other/Money.vue";

const props = defineProps({
  characterData: Object,
});

</script>

<template>
  <div class="tab">
    <CharacterOverview
      :name="characterData.name"
      :playerClass="characterData.class"
      :level="characterData.level.value"
      :hp="characterData.resources.hp"
      :max_hp="characterData.resources.max_hp"
      :mp="characterData.resources.mp"
      :max_mp="characterData.resources.max_mp"
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
  padding-right: 30px;
}
</style>
