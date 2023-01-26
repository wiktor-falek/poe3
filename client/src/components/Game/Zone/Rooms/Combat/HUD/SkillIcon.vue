<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps(["apCost", "mpCost", "imgId"]);

const imgSrc = ref(
  props.imgId ? `https://nosapki.com/images/icons/${props.imgId}.png` : ""
);

console.log(imgSrc);
</script>

<template>
  <div class="skill-icon" :style="{ 'background-image': `url(${imgSrc})` }">
    <p v-if="props.apCost" class="ap-cost">{{ props.apCost }}</p>
    <p v-if="props.mpCost" class="mp-cost">{{ props.mpCost }}</p>
  </div>
</template>

<style scoped>
.skill-icon {
  display: flex;
  flex-direction: column;
  width: 48px;
  height: 48px;
  border: 1px solid rgb(241, 241, 241);
  box-sizing: content-box;
  justify-content: space-between;
  background-repeat: no-repeat;
  background-size: cover;
}

p {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 20px;
  width: 16px;
  font-size: 24px;
  /* this needs a font with a black outline */
  color: rgb(207, 207, 207);
}

.ap-cost {
  color: rgb(245, 245, 101);
  align-self: flex-start;
}

.mp-cost {
  color: rgb(205, 205, 248);
  align-self: flex-end;
}
</style>
