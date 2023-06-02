<script lang="ts" setup>
import { Level, Resources } from "../../../common/types";

defineProps<{ resources: Resources; level: Level }>();

function percent(value: number, maxValue: number) {
  return Math.round((value / maxValue) * 100);
}
</script>

<template>
  <div class="resource-bars">
    <div
      class="resource-bar resource-bar__hp-bar"
      v-if="resources.hp !== undefined && resources.hp !== null"
    >
      {{ resources.hp }} / {{ resources.maxHp }}
      <div
        class="resource-bar__progress resource-bar__progress--hp-bar"
        :style="{
          width: `${percent(resources.hp, resources.maxHp)}%`,
        }"
      ></div>
    </div>
    <div
      class="resource-bar resource-bar__mp-bar"
      v-if="resources.mp !== undefined && resources.mp !== null"
    >
      {{ resources.mp }} / {{ resources.maxMp }}
      <div
        class="resource-bar__progress resource-bar__progress--mp-bar"
        :style="{
          width: `${percent(resources.mp, resources.maxMp)}%`,
        }"
      ></div>
    </div>

    <div class="resource-bar" v-if="level">
      {{ level.xp }} / {{ level.requiredXp }}
      <div
        class="resource-bar__progress resource-bar__progress--xp-bar"
        :style="{
          width: `${percent(level.xp, level.requiredXp)}%`,
        }"
      ></div>
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
  background-color: rgb(110, 110, 110);
  width: 100%;
  border-radius: 5px;
  font-size: 18px;
  height: 22px;
  color: black;
  display: flex;
  align-items: center;
  border: 2px solid white;
  font-weight: 600;
  justify-content: center;
}
.resource-bar__progress {
  position: relative;
  height: 100%;
}
.resource-bar__progress--hp-bar {
  background-color: #ed4f51;
}

.resource-bar__progress--mp-bar {
  background-color: #3185cf;
}

.resource-bar__progress--xp-bar {
  background-color: rgb(227, 230, 15);
}
</style>
