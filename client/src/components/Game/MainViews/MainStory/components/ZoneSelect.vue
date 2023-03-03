<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { usePlayerStore } from "../../../../../stores/playerStore";
import { onBeforeMount, ref, Ref } from "vue";
import useSocketStore from "../../../../../stores/socketStore";

const emit = defineEmits(["zoneSelect"]);

const socketStore = useSocketStore();
const socket = socketStore.socket;
const playerStore = usePlayerStore();

const highestZoneId = computed(
  () => playerStore.character.progression.mainStory.highestZoneId
);

const selectedId = ref();

function selectZoneHandle(id: number) {
  if (highestZoneId.value >= id) {
    selectedId.value = id;
  }
}

function selectZone() {
  if (
    selectedId.value === null ||
    selectedId.value === undefined ||
    highestZoneId.value > selectedId.value
  )
    return;
  emit("zoneSelect", selectedId.value);
}

const zones: Ref<Map<number, any>> = ref();
onBeforeMount(() => {
  socket.emit("zones:get-main-story");
  socket.on("zones:main-story", (zonesData: Array<any>) => {
    const map = new Map(
      zonesData.map((zone) => {
        const { id, ...rest } = zone;
        return [id, rest];
      })
    );
    zones.value = map;
  });
});
</script>


<template>
  <div class="zone-select" v-if="zones">
    <div
      class="zone"
      :class="{ locked: id > highestZoneId, selected: selectedId === id }"
      @click="selectZoneHandle(id)"
      v-for="[id, zone] in zones.entries()"
    >
      {{ zone.name }} (zone lvl {{ zone.zoneLvl }})
    </div>
  </div>
  <button class="button" @click="selectZone">Select</button>
</template>

<style scoped>
.zone {
  width: 100%;
  height: 80px;
  background-color: rgb(66, 66, 66);
  border-radius: 10px;
  flex-shrink: 0;
  padding: 5px;
  font-size: 1.4rem;
}

.zone-select {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 554px;
  overflow: scroll;
  padding: 10px;
  border: 1px solid gray;
  border-radius: 20px;
}

.locked {
  background-color: rgb(40, 40, 40);
}

.selected {
  border: 1px solid orange;
}
</style>
