<script lang="ts" setup>
import { ref } from "vue";
import EquipmentItemContextMenu from "../../Tooltips/EquipmentItemContextMenu.vue";
import InventoryItemContextMenu from "../../Tooltips/InventoryItemContextMenu.vue";
import ItemTooltip from "../../Tooltips/ItemTooltip.vue";

const props = defineProps([
  "slot",
  "item",
  "idx",
  "displayContextMenu",
  "displayEquipmentContextMenu",
]);
const emit = defineEmits(["closeContextMenu"]);

const hover = ref(false);

function startDrag(event: any, index: number) {
  console.log("startDrag", index);
  event.dataTransfer.dropEffect = "move";
  event.dataTransfer.effectAllowed = "move";
  event.dataTransfer.setData("index", index);
}

function closeContextMenu() {
  emit("closeContextMenu");
}
</script>

<template>
  <Teleport to="body">
    <ItemTooltip v-if="hover === true" :item="item" />
  </Teleport>
  <div
    v-if="props.item"
    class="item"
    draggable="true"
    @dragstart="startDrag($event, props.idx)"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{
      'equipment-slot--normal': item && item.rarity === 'normal',
      'equipment-slot--magic': item && item.rarity === 'magic',
      'equipment-slot--rare': item && item.rarity === 'rare',
      'equipment-slot--unique': item && item.rarity === 'unique',
    }"
  >
    <div class="icon"></div>
  </div>
  <!-- empty element if item is null -->
  <div class="item" v-else></div>

  <InventoryItemContextMenu
    v-if="props.displayContextMenu"
    :idx="props.idx"
    @closeContextMenu="closeContextMenu"
  />
  <EquipmentItemContextMenu
    v-if="props.displayEquipmentContextMenu"
    :slot="props.slot"
    @closeContextMenu="closeContextMenu"
  />
</template>

<style scoped>
.item {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  position: relative;
}

.item > .icon {
  height: 46px;
  width: 46px;
  background-image: url("../../../../assets/119a1779829398a.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  display: block;
  object-fit: contain;
}

.equipment-slot--normal {
  border: 1px solid var(--item-rarity--normal);
}

.equipment-slot--magic {
  border: 1px solid var(--item-rarity--magic);
}

.equipment-slot--rare {
  border: 1px solid var(--item-rarity--rare);
}

.equipment-slot--unique {
  border: 1px solid var(--item-rarity--unique);
}
</style>
