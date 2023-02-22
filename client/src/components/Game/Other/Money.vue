<script setup>
import { computed } from "@vue/reactivity";
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();

const money = computed(() => {
  const silver = playerStore.character.silver;

  const gold = Math.floor(silver / 100);
  const silverRemainder = silver - gold * 100;

  return { gold, silver: silverRemainder };
});
</script>

<template>
  <div class="money" v-if="money.gold !== null && money.value !== null">
    <p>
      <span class="gold-value">
        {{ money.gold }}
      </span>
      <span class="gold-icon"> G</span>
    </p>

    <p>
      <span class="silver-value">
        {{ money.silver }}
      </span>
      <span class="silver-icon"> S</span>
    </p>
  </div>
</template>

<style scoped>
.money {
  gap: 15px;
  display: flex;
  flex-direction: row;
}
</style>
