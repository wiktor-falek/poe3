<script lang="ts" setup>
import { Ref, ref } from "vue";
import MapRoom from "./MapRoom.vue";
import useSocketStore from "../../../stores/socketStore";
import { createMachine } from "xstate";

const props = defineProps({
  zoneId: Number,
});
const emit = defineEmits(["abandonRun", "joinRoom"]);

const socketStore = useSocketStore();
const socket = socketStore.socket;

const ilvl: Ref<number> = ref();
const location: Ref<number> = ref(0);
const rooms: Ref<Array<any>> = ref([]);
const validRoomChoices: Ref<Array<number>> = ref();

socket.emit("instance:join:main-story", props.zoneId);

socket.on("instance:data", (instanceData) => {
  console.log("here", instanceData);
  location.value = instanceData.currentLocation;
  validRoomChoices.value = instanceData.validRoomChoices;
  rooms.value = instanceData.rooms;
  ilvl.value = instanceData.ilvl;
});

socket.on("error:instance:data", (error) => {
  // TODO: toast
  console.log(error.message);
});

socket.on("error:instance:join", (error) => {
  // TODO: toast
  console.log(error.message);
});

function abandonRunHandle() {
  emit("abandonRun");
}

function joinRoomHandle(roomId: number) {
  emit("joinRoom", roomId);
}

</script>
<template>
  <div class="top">
    <div class="top__wrapper-left">
      <p>zoneId: {{ props.zoneId }}</p>
      <p>ilvl: {{ ilvl }}</p>
    </div>
    <div class="top__wrapper-right">
      <button @click="abandonRunHandle">Abandon Run</button>
      <button @click="joinRoomHandle(location)">Join Room Test</button>
    </div>
  </div>
  <div class="rooms">
    <MapRoom
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
