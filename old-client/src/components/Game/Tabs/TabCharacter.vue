<script setup>
import Attributes from "./CharacterComponents/Attributes.vue";
import Resistances from "./CharacterComponents/Resistances.vue";
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();
const character = playerStore.character;
</script>

<template>
  <div class="tab">
    <Attributes :attributes="character.attributes" />
    <Resistances :resistances="character.resistances" />
    <div class="stats">
      <p class="evasion" v-if="character">Evasion: 0</p>
      <p class="armor" v-if="character">Armor: 0</p>
    </div>
  </div>
</template>

<style scoped>
.tab {
}
</style>
