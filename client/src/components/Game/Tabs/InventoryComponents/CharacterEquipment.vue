<script setup>
import CharacterEquipmentSlot from "./CharacterEquipmentSlot.vue";
const props = defineProps(["equipment"]);
</script>

<template>
  <div class="equipment" v-if="props.equipment">
    <!-- empty element for positioning -->
    <div class="equipment-slot equipment-slot--empty"></div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.helmet" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.amulet" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.hand" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.chest" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.offhand" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.ring_1" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.belt" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.ring_2" />
    </div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.gloves" />
    </div>

    <!-- empty element for positioning -->
      <div class="equipment-slot equipment-slot--empty"></div>

    <div class="background-wrapper">
      <CharacterEquipmentSlot :item="props.equipment.boots" />
    </div>
  </div>
</template>

<style scoped>
.equipment {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* fr fr no cap */
  gap: 5px;
}

.background-wrapper {
  background-color: rgb(28, 28, 28);
}
</style>
