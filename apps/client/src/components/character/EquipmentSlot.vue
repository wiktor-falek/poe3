<script lang="ts" setup>
import { ref } from "vue";
import type { EquipmentSlot } from "../../../../common/types/index";
import useCharacterStore from "../../stores/characterStore";
import WearableItemTooltip from "../items/WearableItemTooltip.vue";

const characterStore = useCharacterStore();

const props = defineProps<{ invisible?: boolean; equipmentSlot?: EquipmentSlot }>();

let item = characterStore.staticCharacter?.items.find(
  (item) => item.equipment === props.equipmentSlot
);

const isHovered = ref(false);
</script>

<template>
  <Teleport to="body" v-if="isHovered">
    <WearableItemTooltip :item="item" />
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
    <div class="item" v-if="item" @mouseover="isHovered = true" @mouseleave="isHovered = false">
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
