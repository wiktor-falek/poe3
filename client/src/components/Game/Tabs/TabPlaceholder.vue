<script setup>
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();
const characterData = playerStore.characterData;
</script>

<template>
  <div class="tab">
    <div>
      <p>Placeholder</p>
    </div>
  </div>
</template>
