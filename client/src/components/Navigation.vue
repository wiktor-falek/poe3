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
    <button tabindex="1" class="toggle-collapsed" @click="isCollapsed = !isCollapsed"></button>
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
  padding: 0;
  border: none;
  margin-bottom: 7px; /* idk why is it like this */
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
  -webkit-transition: width 0.2s ease-out;
  -moz-transition: width 0.2s ease-out;
  -ms-transition: width 0.2s ease-out;
  -o-transition: width 0.2s ease-out;
  transition: width 0.2s ease-out;
  background-color: rgb(60, 60, 60);
  gap: 10px;
  overflow: hidden;
  width: 200px;
}

.accordion > * {
  width: 200px;
}

.collapsed {
  width: 0;
}
</style>
