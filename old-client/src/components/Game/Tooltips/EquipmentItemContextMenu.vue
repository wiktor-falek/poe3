<script lang="ts" setup>
import { usePlayerStore } from "../../../stores/playerStore";
import useSocketStore from "../../../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();
const inventory = playerStore.character.inventory;
const equipment = playerStore.character.equipment;

const props = defineProps(["slot"]);
const emit = defineEmits(["closeContextMenu"]);

function unequipItem() {
  socket.emit("inventory:unequip-item", props.slot);
}
socket.off("inventory:unequip-item");
socket.on("inventory:unequip-item", (data) => {
  const { index, slot } = data;
  console.log(data);
  [inventory[index], equipment[slot]] = [equipment[slot], inventory[index]];
  emit("closeContextMenu");
});

function closeContextMenu() {
  emit("closeContextMenu");
}
</script>

<template>
  <div class="context-menu" v-click-outside-element="closeContextMenu">
    <button class="button" @click="unequipItem">Unequip Item</button>
  </div>
</template>

<style scoped>
.context-menu {
  position: absolute;
  width: 160px;
  background-color: black;
  bottom: calc(60px + 10px);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
}
</style>
