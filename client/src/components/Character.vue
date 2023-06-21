<script lang="ts" setup>
import { ref } from "vue";
import useCharacterStore from "../stores/characterStore";

const characterStore = useCharacterStore();
const character = characterStore.staticCharacter;

const isCollapsed = ref(false);
</script>

<template>
  <div class="character" v-if="character">
    <button tabindex="4" class="toggle-collapsed" @click="isCollapsed = !isCollapsed"></button>
    <div class="accordion" :class="{ collapsed: isCollapsed }">
      <h3>{{ character.name }}</h3>
      <h3>
        Lvl {{ character.level.value }} <span class="capitalize">{{ character.class }}</span>
      </h3>
    </div>
  </div>
</template>

<style scoped>
.character {
  position: absolute;
  display: flex;
  align-items: center;
  flex-direction: row;
  top: 50%;
  right: 0;
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
  background-color: rgb(40, 40, 40);
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  padding: 5px 0;
  gap: 10px;
  overflow: hidden;
  min-height: 100vh;
  width: 400px;
  display: flex;
  align-items: center;
  box-sizing: border-box; /* because apparently padding is added to height in content-box */
  overflow-y: auto;
}

.accordion > p,
h1,
h2,
h3,
h4,
h5,
h6 {
  margin: 0;
}

.collapsed {
  width: 0;
}
</style>
