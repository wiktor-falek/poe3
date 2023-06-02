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

const progressionData: Ref<{ [characterName: string]: number }> = ref({});

const selectedId = ref();

function selectZoneHandle(id: number) {
  if (highestZoneId.value >= id) {
    selectedId.value = id;
  }
}

function createInstance() {
  socket.emit("instance:create-instance", selectedId.value);
}

socket.on("instance:data", (data) => {
  // change view? but each client would have to be in ZoneSelect view
})

// function selectZone() {
//   if (
//     selectedId.value === null ||
//     selectedId.value === undefined ||
//     highestZoneId.value > selectedId.value
//   )
//     return;
//   emit("zoneSelect", selectedId.value);
// }

const zones: Ref<Map<number, any>> = ref();
onBeforeMount(() => {
  socket.emit("zones:get-main-story");
  socket.on(
    "zones:main-story",
    (zonesData: Array<any>, charactersProgression: any) => {
      progressionData.value = charactersProgression;
      const map = new Map(
        zonesData.map((zone) => {
          const { id, ...rest } = zone;
          return [id, rest];
        })
      );
      zones.value = map;
    }
  );
});

function charactersWithoutProgression(id: number) {
  progressionData.value;
  const characters = [];
  for (const [character, progression] of Object.entries(
    progressionData.value
  )) {
    if (progression < id) {
      characters.push(character);
    }
  }
  return characters;
}
</script>

<template>
  <div class="zone-select" v-if="zones">
    <div
      class="zone"
      :class="{ locked: id > highestZoneId, selected: selectedId === id }"
      @click="selectZoneHandle(id)"
      v-for="[id, zone] in zones.entries()"
    >
      <div>{{ zone.name }} (zone lvl {{ zone.zoneLvl }})</div>

      <div style="color: red" v-if="id <= highestZoneId">
        <p v-if="charactersWithoutProgression(id).length">
          Progression requirements not met:
        </p>
        <p>
          <span v-for="character in charactersWithoutProgression(id)">
            {{ character }}
          </span>
        </p>
      </div>
    </div>
  </div>
  <button class="button" @click="createInstance">Create Instance</button>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
