<script setup>
import { usePlayerStore } from "../../../stores/playerStore";

const playerStore = usePlayerStore();
const character = playerStore.character;
</script>

<template>
  <div class="tab">
    <div>
      <p>Placeholder</p>
    </div>
  </div>
</template>
