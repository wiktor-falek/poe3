<script lang="ts" setup>
import { ref } from "vue";

const props = defineProps(["apCost", "mpCost", "imgId"]);

// placeholder icons
const imgSrc = ref(
  props.imgId ? `https://nosapki.com/images/icons/${props.imgId}.png` : ""
);

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
  background-color: rgb(42, 42, 42);
}

p {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  height: 20px;
  color: rgb(207, 207, 207);
  /*
  TODO: 
  this is barely visible on some background images, 
  needs either a font with a black outline
  or to be positioned differently
  */
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
