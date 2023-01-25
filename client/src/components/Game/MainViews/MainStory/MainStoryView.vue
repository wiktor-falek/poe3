<script lang="ts" setup>
import useSocketStore from "../../../../stores/socketStore";
import ZoneSelect from "./components/ZoneSelect.vue";
import { createMachine, interpret } from "xstate";
import { ref } from "vue";
import type { Ref } from "vue";
import ZoneView from "../../Zone/ZoneView.vue";
import RoomView from "../../Zone/RoomView.vue";

const socketStore = useSocketStore();
const socket = socketStore.socket;

const zoneId: Ref<number | null> = ref(null);
const view: Ref<string> = ref("");
const stateMachine = createMachine({
  predictableActionArguments: true,
  id: "state",
  initial: "zoneSelect",
  states: {
    zoneSelect: {
      on: {
        SELECT: "roomSelect",
      },
    },
    roomSelect: {
      // type: "final",
      on: {
        ABANDON: "zoneSelect",
        JOIN_ROOM: "inRoom"
      },
    },
    inRoom: {
      on: {
        ABANDON: "zoneSelect",
        LEAVE_ROOM: "roomSelect"
      }
    }
  },
});

const stateService = interpret(stateMachine)
  .onTransition((state) => {
    console.log("new state", state.value);
    view.value = state.value as string;
  })
  .start();

function joinZone(id: number) {
  zoneId.value = id;
  stateService.send("SELECT");
}

(function checkIfInstanceAlreadyExists() {
  socket.emit("instance:already-exists?");
  socket.on("instance:already-exists", (data) => {
    console.log(data);
    if (data.instanceAlreadyExists) {
      joinZone(data.zoneId);
    }
  });
})();

function abandonRun() {
  // TODO: check with the server whether it was successfull and then change state
  socket.emit("instance:abandon-run"); 
  stateService.send("ABANDON");
}

function joinRoom(roomId: number) {
  // TODO: check with the server whether it was successfull and then change state
  socket.emit("instance:join-room", roomId);
  stateService.send("JOIN_ROOM")
}

function leaveRoom() {
  console.log("leaving room");
  stateService.send("LEAVE_ROOM")
}
</script>

<template>
  <div class="main-story">
    <ZoneSelect
      v-if="view === 'zoneSelect'"
      @zone-select="(id) => joinZone(id)"
    />
    <ZoneView
      v-if="view === 'roomSelect'"
      :zone-id="zoneId"
      @abandon-run="abandonRun"
      @join-room="joinRoom"
      @leave-room="leaveRoom"
    />
    <RoomView v-if="view === 'inRoom'" @leave-room="leaveRoom" />
  </div>
</template>

<style scoped>
.main-story {
  padding: 5px;
}
</style>
