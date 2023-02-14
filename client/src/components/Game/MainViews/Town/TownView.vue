<script lang="ts" setup>
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();
const inventory = playerStore.characterData.inventory;

function addItemTest() {
  socket.emit("inventory:add-test-item");
}
socket.on("inventory:add-item", (data) => {
  const { index, item } = data;
  inventory[index] = item;
});

function swapInventoryIncides() {
  socket.emit("inventory:swap-inventory-indices");
}

socket.off("inventory:swap-inventory-indices");
socket.on("inventory:swap-inventory-indices", (data) => {
  const [firstIndex, secondIndex] = data.swappedIndices;
  [inventory[firstIndex], inventory[secondIndex]] = [
    inventory[secondIndex],
    inventory[firstIndex],
  ];
});
</script>

<template>
  <h1>Town</h1>
  <button @click="addItemTest">Add Item Test</button>
  <button @click="swapInventoryIncides">Swap Inventory</button>
</template>

<style scoped></style>
