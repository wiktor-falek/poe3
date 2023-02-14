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
}

.equipment-slot--empty {
  visibility: hidden;
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
