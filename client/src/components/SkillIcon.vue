<script lang="ts" setup>
import saberSlash from "../assets/game-icons/saber-slash.svg";
import swordArray from "../assets/game-icons/sword-array.svg";
const props = defineProps<{ apCost: number; keyBind: string; imgId: string; selected?: boolean }>();

const icons: { [id: string]: string } = {
  0: saberSlash,
  1: swordArray,
};
</script>

<template>
  <div
    class="skill-icon"
    :class="{ selected: selected }"
    :style="{ 'background-image': `url(${icons[imgId]})` }"
  >
    <p v-if="keyBind">{{ keyBind }}</p>
    <p v-if="apCost">{{ apCost }}</p>
  </div>
</template>

<style scoped>
.skill-icon {
  width: 48px;
  height: 48px;
  box-sizing: border-box;
  border: 2px solid rgb(241, 241, 241);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: rgb(42, 42, 42);
}

.skill-icon > p {
  font-size: 16px;
  margin: 0;
  line-height: 1em;
  font-weight: bold;
  font-family: BmCube;
  display: inline-block;
}

.selected {
  border-color: var(--select);
}
</style>
