<script setup>
import { defineProps, onMounted, reactive } from "vue";
const props = defineProps(["silver"]);

const money = reactive({ gold: null, silver: null });

onMounted(() => {
  const silver = props.silver;

  const gold = Math.floor(silver / 100);
  const silverRemainder = silver - (gold * 100);

  money.gold = gold;
  money.silver = silverRemainder;

  console.log(money);
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
