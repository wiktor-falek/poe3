<script setup>
import CharacterEquipmentSlot from "./CharacterEquipmentSlot.vue";
const props = defineProps(["equipment"]);
</script>

<template>
  <div class="equipment" v-if="props.equipment">
    <!-- empty element for positioning -->
    <div class="equipment-slot equipment-slot--empty"></div>

    <CharacterEquipmentSlot :item="props.equipment.helmet" />

    <CharacterEquipmentSlot :item="props.equipment.amulet" />

    <CharacterEquipmentSlot :item="props.equipment.hand" />

    <CharacterEquipmentSlot :item="props.equipment.chest" />

    <CharacterEquipmentSlot :item="props.equipment.offhand" />

    <CharacterEquipmentSlot :item="props.equipment.ring_1" />

    <CharacterEquipmentSlot :item="props.equipment.belt" />

    <CharacterEquipmentSlot :item="props.equipment.ring_2" />

    <CharacterEquipmentSlot :item="props.equipment.gloves" />

    <!-- empty element for positioning -->
    <div class="equipment-slot equipment-slot--empty"></div>

    <CharacterEquipmentSlot :item="props.equipment.boots" />
  </div>
</template>

<style scoped>
.equipment {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* fr fr no cap */
  gap: 10px;
}
</style>
