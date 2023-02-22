<script lang="ts" setup>
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();
const inventory = playerStore.character.inventory;

function addItemTest() {
  socket.emit("inventory:add-test-item");
}
socket.on("inventory:add-item", (data) => {
  const { index, item } = data;
  inventory[index] = item;
});
</script>

<template>
  <h1>Town</h1>
  <button @click="addItemTest">Add Item Test</button>
</template>
