<script lang="ts" setup>
import { ref, Ref } from "vue";
import { usePlayerStore } from "../../../../stores/playerStore";
import useSocketStore from "../../../../stores/socketStore";
import Item from "./Item.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const playerStore = usePlayerStore();
const inventory = playerStore.character.inventory;

function onDrop(event: any, index: number) {
  const dragIndex = event.dataTransfer.getData("index");
  if (!index && !dragIndex) {
  }

  const firstIndex = +dragIndex;
  const secondIndex = +index;

  if (firstIndex === secondIndex) {
    return null;
  }
  console.log(`Dragging ${firstIndex} to ${secondIndex}`);
  socket.emit("inventory:swap-inventory-indices", firstIndex, secondIndex);
}

socket.off("inventory:swap-inventory-indices");
socket.on("inventory:swap-inventory-indices", (data) => {
  const [firstIndex, secondIndex] = data.swappedIndices;
  [inventory[firstIndex], inventory[secondIndex]] = [
    inventory[secondIndex],
    inventory[firstIndex],
  ];
});

const itemContextMenuIndex: Ref<null | number> = ref(null);

function changeContextMenuIndex(idx: number | null) {
  if (idx == null) {
    itemContextMenuIndex.value = null;
    return;
  }
  if (inventory[idx] == null) {
    return;
  }
  itemContextMenuIndex.value = idx;
}
</script>

<template>
  <div class="inventory">
    <div
      class="inventory__slot"
      v-for="idx in 32"
      @drop="onDrop($event, idx - 1)"
      @dragenter.prevent
      @dragover.prevent
      @contextmenu="changeContextMenuIndex(idx - 1)"
    >
      <Item
        :item="inventory[idx - 1]"
        :idx="idx - 1"
        :displayContextMenu="itemContextMenuIndex === idx - 1"
        @closeContextMenu="changeContextMenuIndex(null)"
      />
    </div>
  </div>
</template>

<style scoped>
.inventory {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr; /* fr fr no cap */
  border: 1px solid grey;
  background-color: grey;
  gap: 1px;
}

.inventory__slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background-color: rgb(28, 28, 28);
}
</style>
