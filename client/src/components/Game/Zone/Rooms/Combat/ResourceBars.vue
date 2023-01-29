<script lang="ts" setup>
const props = defineProps(["resources"]);
</script>

<template>
  <div class="resource-bars">
    <div class="resource-bar resource-bar__hp-bar" v-if="props.resources.hp">
      {{ props.resources.hp }} / {{ props.resources.maxHp }}
    </div>
    <div class="resource-bar resource-bar__mp-bar" v-if="props.resources.mp">
      {{ props.resources.mp }} / {{ props.resources.maxMp }}
    </div>
  </div>
</template>

<style scoped>
.resource-bars {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.resource-bar {
  width: 100%;
  border-radius: 5px;
  font-size: 18px;
  height: 18px;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resource-bar__hp-bar {
  background-color: #ed4f51;
}

.resource-bar__mp-bar {
  background-color: #3185cf;
}
</style>
