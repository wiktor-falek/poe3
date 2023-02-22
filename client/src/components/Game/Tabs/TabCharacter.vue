<script setup>
import Attributes from "./CharacterComponents/Attributes.vue";
import Resistances from "./CharacterComponents/Resistances.vue";
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();
const characterData = playerStore.characterData;
</script>

<template>
  <div class="tab">
    <Attributes :attributes="characterData.attributes" />
    <Resistances :resistances="characterData.resistances" />
    <div class="stats">
      <p class="evasion" v-if="characterData">Evasion: 0</p>
      <p class="armor" v-if="characterData">Armor: 0</p>
    </div>
  </div>
</template>

<style scoped>
.tab {
}
</style>
