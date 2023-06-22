<script lang="ts" setup>
import { ref } from "vue";
import type { EquipmentSlot } from "../../../../common";
import useCharacterStore from "../../stores/characterStore";
import EquippableItemTooltip from "../items/EquippableItemTooltip.vue";

const characterStore = useCharacterStore();
const equipment = characterStore.staticCharacter?.equipment;

const props = defineProps<{ invisible?: boolean; equipmentSlot?: EquipmentSlot }>();

let item: any = null;
if (equipment && props.equipmentSlot) {
  item = equipment[props.equipmentSlot];
}

const isHovered = ref(false);
</script>

<template>
  <Teleport to="body" v-if="isHovered">
    <EquippableItemTooltip :item="item" />
  </Teleport>
  <div
    class="equipment-slot"
    :class="{
      hidden: invisible,
      'border--normal': item && item.rarity === 'normal',
      'border--magic': item && item.rarity === 'magic',
      'border--rare': item && item.rarity === 'rare',
      'border--unique': item && item.rarity === 'unique',
    }"
  >
    <div
      class="item"
      v-if="equipmentSlot && equipment && equipment[equipmentSlot]"
      @mouseover="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <img src="../../assets/item-icons/ring.jpg" alt="" />
    </div>
  </div>
</template>

<style scoped>
.hidden {
  visibility: hidden;
}
.equipment-slot {
  width: 48px;
  height: 48px;
  box-sizing: content-box;
  border: 1px solid rgb(100, 100, 100);
}

.item {
  background-color: rgb(133, 133, 133);
  width: 48px;
  height: 48px;
  user-select: none;
}

.item > img {
  width: 100%;
  height: 100%;
}
.border--normal {
  border-color: var(--item-rarity--normal);
}
.border--magic {
  border-color: var(--item-rarity--magic);
}
.border--rare {
  border-color: var(--item-rarity--rare);
}
.border--unique {
  border-color: var(--item-rarity--unique);
}
</style>
