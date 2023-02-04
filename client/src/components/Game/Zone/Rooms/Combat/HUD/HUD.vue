<script lang="ts" setup>
import SkillIcon from "./SkillIcon.vue";
</script>

<template>
  <div class="hud">
    <div class="idk">
      <div class="resources">
        <p class="action-points">AP: 3/3</p>
      </div>
      <div class="side-skills">
        <SkillIcon :ap-cost="1" :imgId="5833" />
        <SkillIcon :ap-cost="0" />
      </div>
      <div class="main-skills">
        <SkillIcon :ap-cost="1" :mp-cost="5" :imgId="5834" />
        <SkillIcon :ap-cost="2" :mp-cost="5" :imgId="5835" />
        <SkillIcon :ap-cost="1" :mp-cost="5" :imgId="5836" />
        <SkillIcon />
        <SkillIcon />
        <SkillIcon />
        <SkillIcon />
        <SkillIcon />
      </div>
    </div>
  </div>
</template>

<style scoped>

.action-points {
  height: 100%;
  color: rgb(245, 245, 101);
  font-size: 22px;
}
.hud {
  display: flex;
  align-items: center;
  justify-content: center;
}

.idk {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
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
