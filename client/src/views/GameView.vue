<script setup>
import Game from "../components/Game/Game.vue";
import { usePlayerStore } from "../stores/playerStore";
import useSocketStore from "../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;
const playerStore = usePlayerStore();

socket.on("character:data", (character) => {
  if (character != null) {
    playerStore.loadcharacter(character);
  } else {
    console.log("Failed to load character data emitted by the server");
  }
});

// TODO: Display loading animation while trying to establish connection for n seconds
// If failed render <Maintenance /> View
</script>

<template>
  <main>
    <Game v-if="socketStore.isConnected && playerStore.character != null" />
    <p v-else>*Maintenance View*</p>
  </main>
</template>
