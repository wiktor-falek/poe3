<script lang="ts" setup>
import SkillIcon from "./SkillIcon.vue";
</script>

<template>
  <div class="skills">
    <div class="resources">
      <p class="action-points">AP: 3/3</p>
    </div>
    <div class="side-skills">
      <SkillIcon :ap-cost="1" :imgId="5833" />
      <SkillIcon :ap-cost="0" />
    </div>
    <div class="gap"></div>
    <div class="main-skills">
      <SkillIcon :ap-cost="1" :mp-cost="5" :imgId="5834" />
      <SkillIcon :ap-cost="2" :mp-cost="5" :imgId="5835" />
      <SkillIcon :ap-cost="1" :mp-cost="5" :imgId="5836" />
      <SkillIcon :ap-cost="1" :mp-cost="5" :imgId="5837" />
      <SkillIcon :ap-cost="2" :mp-cost="5" :imgId="5838" />
      <SkillIcon :ap-cost="2" :mp-cost="5" :imgId="5839" />
      <SkillIcon :ap-cost="3" :mp-cost="8" :imgId="5840" />
      <SkillIcon :ap-cost="3" :mp-cost="10" :imgId="5841" />
    </div>
  </div>
</template>

<style scoped>
.action-points {
  color: rgb(245, 245, 101);
  font-size: 22px;
}
.skills {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gap {
  width: 50px;
}

.side-skills {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: fit-content;
  gap: 10px;
}

.main-skills {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  width: fit-content;
  gap: 10px;
}
</style>
