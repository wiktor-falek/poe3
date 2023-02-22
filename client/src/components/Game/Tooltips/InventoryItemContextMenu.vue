<script lang="ts" setup>
import { usePlayerStore } from "../../../stores/playerStore";
import useSocketStore from "../../../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();
const inventory = playerStore.character.inventory;
const equipment = playerStore.character.equipment;

const props = defineProps(["idx"]);
const emit = defineEmits(["closeContextMenu"]);

function equipItem() {
  socket.emit("inventory:equip-item", props.idx);
}
socket.off("inventory:equip-item");
socket.on("inventory:equip-item", (data) => {
  const { index, slot } = data;
  console.log(data);
  [inventory[index], equipment[slot]] = [equipment[slot], inventory[index]];
  emit("closeContextMenu");
});

function destroyItem() {
  socket.emit("inventory:delete-item", props.idx);
}

socket.off("inventory:delete-item");
socket.on("inventory:delete-item", (data) => {
  console.log("deleted item", data);
  inventory[props.idx] = null;
  emit("closeContextMenu");
});

function closeContextMenu() {
  emit("closeContextMenu");
}
</script>

<template>
  <div class="context-menu" v-click-outside-element="closeContextMenu">
    <button @click="equipItem">Equip Item</button>
    <button @click="destroyItem">Destroy Item</button>
  </div>
</template>

<style scoped>
.context-menu {
  position: absolute;
  width: 160px;
  border: 2px solid orange;
  background-color: black;
  bottom: calc(60px + 10px);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

button {
}
</style>
