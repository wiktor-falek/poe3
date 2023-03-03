<script lang="ts" setup>
const props = defineProps(["resources", "level"]);

function percent(value: number, maxValue: number) {
  return Math.round((value / maxValue) * 100);
}
</script>

<template>
  <div class="resource-bars">
    <div
      class="resource-bar resource-bar__hp-bar"
      v-if="props.resources.hp !== undefined && props.resources.hp !== null"
    >
      <div
        class="resource-bar__progress resource-bar__progress--hp-bar"
        :style="{
          width: `${percent(props.resources.hp, props.resources.maxHp)}%`,
        }"
      ></div>
      <div class="resource-bar__data">
        {{ props.resources.hp }} / {{ props.resources.maxHp }}
      </div>
    </div>
    <div
      class="resource-bar resource-bar__mp-bar"
      v-if="props.resources.mp !== undefined && props.resources.mp !== null"
    >
      <div
        class="resource-bar__progress resource-bar__progress--mp-bar"
        :style="{
          width: `${percent(props.resources.mp, props.resources.maxMp)}%`,
        }"
      ></div>
      <div class="resource-bar__data">
        {{ props.resources.mp }} / {{ props.resources.maxMp }}
      </div>
    </div>

    <div class="resource-bar" v-if="props.level">
      <div
        class="resource-bar__progress resource-bar__progress--xp-bar"
        :style="{
          width: `${percent(props.level.xp, props.level.requiredXp)}%`,
        }"
      ></div>
      <div class="resource-bar__data">
        {{ props.level.xp }} / {{ props.level.requiredXp }}
      </div>
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
  border: 1px solid white;
}

.resource-bar__data {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  position: absolute;
}

.resource-bar__progress {
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
