<script setup>
import { computed } from "@vue/reactivity";
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();

const money = computed(() => {
  const silver = playerStore.characterData.silver;

  const gold = Math.floor(silver / 100);
  const silverRemainder = silver - (gold * 100);

  return { gold, silver: silverRemainder };
})

</script>

<template>
  <div class="money" v-if="money.gold !== null && money.value !== null">
    <p>{{ money.gold }} G</p>
    <p>{{ money.silver }} S</p>
  </div>
</template>

<style scoped>
.money {
  display: flex;
  gap: 15px;
}
</style>
