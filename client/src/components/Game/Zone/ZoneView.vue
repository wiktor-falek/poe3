<script lang="ts" setup>
import { Ref, ref } from "vue";
import Room from "./Room.vue";
import useSocketStore from "../../../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;
const props = defineProps({
  zoneId: Number,
});

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
</script>
<template>
  <p>zoneId: {{ props.zoneId }}</p>
  <p>ilvl: {{ ilvl }}</p>
  <div class="rooms">
    <Room
      :name="room.name"
      v-for="(room, idx) in rooms"
      :class="{ current: idx === location }"
    />
  </div>
</template>

<style scoped>
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
