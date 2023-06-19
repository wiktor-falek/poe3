<script lang="ts" setup>
import { Resources } from "../../../common/index";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
type ResourcesOptionalAp = Optional<Resources, "mp" | "maxMp" | "ap" | "maxAp">;

defineProps<{ resources: ResourcesOptionalAp }>();
</script>

<template>
  <div class="resource-bars">
    <div class="resource-bar resource-bar--hp">
      <span class="resource-bar__text">{{ resources.hp }} / {{ resources.maxHp }}</span>
      <progress
        class="resource-bar__progress resource-bar__progress--hp"
        :value="resources.hp"
        :max="resources.maxHp"
      ></progress>
    </div>

    <div class="resource-bar resource-bar--mp" v-if="resources.maxMp">
      <span class="resource-bar__text">{{ resources.mp }} / {{ resources.maxMp }}</span>
      <progress
        class="resource-bar__progress resource-bar__progress--mp"
        :value="resources.mp"
        :max="resources.maxMp"
      ></progress>
    </div>

    <div class="resource-bar resource-bar--ap" v-if="resources.maxAp">
      <span class="resource-bar__text">{{ resources.ap }} / {{ resources.maxAp }}</span>
      <progress
        class="resource-bar__progress resource-bar__progress--ap"
        :value="resources.ap"
        :max="resources.maxAp"
      ></progress>
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
  width: 96px;
  --height: 22px;
  height: var(--height);
  position: relative;
}

.resource-bar__text {
  position: absolute;
  width: 100%;
  color: black;
  opacity: 0.8;
  padding: 0;
  margin: 0;
  text-align: center;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  transform: translate(0, 2px);
  line-height: 22px;
}
.resource-bar__progress {
  width: 96px;
  appearance: none;
  background-color: gray;
  border: 2px solid rgb(218, 218, 218);
  border-radius: 5px;
  box-sizing: border-box;
}

.resource-bar__progress--hp::-moz-progress-bar {
  background: #ed4f51;
}

.resource-bar__progress--mp::-moz-progress-bar {
  background: #3185cf;
}
.resource-bar__progress--ap::-moz-progress-bar {
  background: rgba(214, 214, 12, 0.778);
}
</style>
