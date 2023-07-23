<script lang="ts" setup>
import ResourceBars from "./ResourceBars.vue";
import useCharacterStore from "../stores/characterStore";
const characterStore = useCharacterStore();
const character = characterStore.dynamicCharacter;
</script>

<template>
  <div class="character-overview" v-if="character !== null">
    <p class="name color--this-player">{{ character.name }}</p>
    <p>
      <span class="player-class">{{ character.class }} &nbsp;</span>
      <span>Lv {{ character.level }}</span>
    </p>
    <div class="resources">
      <ResourceBars :resources="character.resources" :level="character.level" />
    </div>
  </div>
</template>

<style scoped>
.character-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}
.player-class {
  text-transform: capitalize;
}

.resources {
  width: 150px;
}
</style>
../stores/playerStore