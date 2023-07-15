<script lang="ts" setup>
import useCharacterStore from "../../stores/characterStore";
import EquipmentSlot from "./EquipmentSlot.vue";

const characterStore = useCharacterStore();
const equipment = characterStore.character?.inventory;
</script>

<template>
  <div class="equipment">
    <EquipmentSlot :invisible="true" />
    <EquipmentSlot equipment-slot="helmet" />
    <EquipmentSlot equipment-slot="amulet" />
    <EquipmentSlot equipment-slot="hand" />
    <EquipmentSlot equipment-slot="chest" />
    <EquipmentSlot equipment-slot="offhand" />
    <EquipmentSlot equipment-slot="ring_1" />
    <EquipmentSlot equipment-slot="belt" />
    <EquipmentSlot equipment-slot="ring_2" />
    <EquipmentSlot equipment-slot="gloves" />
    <EquipmentSlot :invisible="true" />
    <EquipmentSlot equipment-slot="boots" />
  </div>
</template>

<style scoped>
.equipment {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, 1fr);
  gap: 5px;
}
</style>
