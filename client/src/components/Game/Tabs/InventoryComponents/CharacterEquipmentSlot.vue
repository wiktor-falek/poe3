<script setup>
import { ref } from "vue";
import ItemTooltip from "../../Tooltips/ItemTooltip.vue";
const props = defineProps(["item"]);

const hover = ref(false);
</script>

<template>
  <Teleport to="body">
    <ItemTooltip v-if="hover === true" :item="item" />
  </Teleport>
  <div
    v-if="item"
    class="equipment-slot"
    @mouseover="hover = true"
    @mouseleave="hover = false"
    :class="{
      'equipment-slot--normal': item && item.rarity === 'normal',
      'equipment-slot--magic': item && item.rarity === 'magic',
      'equipment-slot--rare': item && item.rarity === 'rare',
      'equipment-slot--unique': item && item.rarity === 'unique',
    }"
  >
    <img v-if="item" :src="item.image" />
  </div>
  <div v-else class="equipment-slot"></div>
</template>

<style scoped>
.equipment-slot > img {
  width: 48px;
  height: auto;
}

.equipment-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border: 2px solid rgb(117, 117, 117);
  background-color: rgb(41, 41, 41);
}

.equipment-slot--empty {
  visibility: hidden;
}

.equipment-slot--normal {
  border-color: white;
}

.equipment-slot--magic {
  border-color: rgb(24, 67, 206);
}

.equipment-slot--rare {
  border-color: rgb(194, 202, 81);
}

.equipment-slot--unique {
  border-color: rgb(221, 119, 3);
}
</style>
