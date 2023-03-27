<script lang="ts" setup>
import { Ref, ref } from "vue";
import RoomSelectView from "./RoomSelectView.vue";
import useSocketStore from "../../../stores/socketStore";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const props = defineProps({
  zoneId: Number,
});
const emit = defineEmits(["abandonRun", "joinRoom"]);

const zoneLvl: Ref<number> = ref();
const location: Ref<number> = ref(0);
const rooms: Ref<Array<any>> = ref([]);
const validRoomChoices: Ref<Array<number>> = ref();

// socket.emit("instance:create-instance", props.zoneId);

socket.on("instance:data", (instanceData) => {
  console.log({instanceData});
  location.value = instanceData.currentLocation;
  validRoomChoices.value = instanceData.validRoomChoices;
  rooms.value = instanceData.rooms;
  zoneLvl.value = instanceData.zoneLvl;
});

function abandonRunHandle() {
  emit("abandonRun");
}

function joinRoomHandle(roomId: number) {
  if (!validRoomChoices.value.includes(roomId)) {
    return;
  }
  emit("joinRoom", roomId);
}
</script>
<template>
  <div class="top">
    <div class="top__wrapper-left">
      <p>zoneId: {{ props.zoneId }}</p>
      <p>zoneLvl: {{ zoneLvl }}</p>
      <p>
        valid room choices:
        <span>[ </span>
        <span v-for="id in validRoomChoices"> {{ id }}, </span>
        <span> ]</span>
      </p>
    </div>
    <div class="top__wrapper-right">
      <button class="button" @click="abandonRunHandle">Abandon Run</button>
    </div>
  </div>
  <div class="rooms">
    <RoomSelectView
      :name="room.name"
      :id="room.id"
      v-for="room in rooms"
      :class="{ selectable: validRoomChoices.includes(room.id) }"
      @click="joinRoomHandle(room.id)"
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

.selectable {
  border-color: white;
  opacity: 1;
}
</style>
