<script lang="ts" setup>
import { Ref, ref } from "vue";
import useSocketStore from "../../../stores/socketStore";
import CombatRoom from "./Rooms/CombatRoom.vue";
import RewardRoom from "./Rooms/RewardRoom.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const emit = defineEmits(["leaveRoom"]);

const roomType: Ref<string> = ref();
const room = ref();

socket.on("instance:room-data", (data) => {
  roomType.value = data.room.type;
  room.value = data.room;
});
</script>

<template>
  <div class="room">
    <div v-if="!roomType">Something went wrong</div>
    <CombatRoom
      v-if="roomType === 'combat'"
      :room="room"
      @leave-room="emit('leaveRoom')"
    />
    <RewardRoom
      v-else-if="roomType === 'reward'"
      :room="room"
      @leave-room="emit('leaveRoom')"
    />
  </div>
</template>

<style scoped>
.room {
  height: 100%;
}
</style>
