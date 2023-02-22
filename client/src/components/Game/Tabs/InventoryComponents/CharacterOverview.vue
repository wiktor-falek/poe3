<script setup>
import { usePlayerStore } from '../../../../stores/playerStore';
import ResourceBars from '../../Zone/Rooms/Combat/ResourceBars.vue';

const playerStore = usePlayerStore();
const character = playerStore.characterData;

</script>

<template>
  <div class="character-overview">
    <p class="name">{{ character.name }}</p>
    <p>
      <span class="player-class">{{ character.class }} &nbsp;</span>
      <span>Lv {{ character.level.value }}</span>
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
  user-select: none;
}
.player-class {
  text-transform: capitalize;
}

.resources {
  width: 150px;
}
</style>
