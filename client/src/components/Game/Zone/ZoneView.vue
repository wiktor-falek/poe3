<script lang="ts" setup>
import { Ref, ref } from "vue";
import Room from "./Room.vue";
import useSocketStore from "../../../stores/socketStore";

const props = defineProps({
  zoneId: Number,
});
const emit = defineEmits(["abandonRun"]);

const socketStore = useSocketStore();
const socket = socketStore.socket;

socket.emit("instance:join", props.zoneId);

socket.on("instance:data", (instanceData) => {
  console.log(instanceData);
  location.value = instanceData.currentLocation;
  rooms.value = instanceData.rooms;
  ilvl.value = instanceData.ilvl;
});

const ilvl: Ref<number> = ref();
const location: Ref<number> = ref(0);
const rooms: Ref<Array<any>> = ref([]);

function abandonRunHandle() {
  emit("abandonRun");
}
</script>
<template>
  <div class="top">
    <div class="top-wrapper">
      <p>zoneId: {{ props.zoneId }}</p>
      <p>ilvl: {{ ilvl }}</p>
    </div>
    <button @click="abandonRunHandle">Abandon Run</button>
  </div>
  <div class="rooms">
    <Room
      :name="room.name"
      v-for="(room, idx) in rooms"
      :class="{ current: idx === location }"
    />
  </div>
</template>

<style scoped>
.top {
  display: flex;
  justify-content: space-between;
}
.rooms {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 20px;
}

.current {
  border-color: orange;
}
</style>
