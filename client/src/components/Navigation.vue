<script lang="ts" setup>
import { ref } from "vue";

const isCollapsed = ref(true);
</script>

<template>
  <nav class="navigation">
    <div class="accordion" :class="{ collapsed: isCollapsed }">
      <RouterLink to="/game/lobby" class="button">Lobby</RouterLink>
      <RouterLink to="/game/instance" class="button">Instance</RouterLink>
    </div>
    <div class="toggle-collapsed" @click="isCollapsed = !isCollapsed"></div>
  </nav>
</template>

<style scoped>
.navigation {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: row;
  top: 50%;
  transform: translate(0, -50%);
}

.toggle-collapsed {
  display: inline-block;
  width: 24px;
  height: 24px;
  background-color: rgb(55, 55, 55);
}

.toggle-collapsed:hover {
  background-color: rgb(80, 80, 80);
}

.accordion {
  display: flex;
  flex-direction: column;
  background-color: rgb(60, 60, 60);
  gap: 10px;
}

.accordion > * {
  width: 200px;
}

.collapsed {
  display: none;
}
</style>
