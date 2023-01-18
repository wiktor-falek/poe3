<script lang="ts" setup>
import useSocketStore from "../../../../stores/socketStore";
import ZoneSelect from "./components/ZoneSelect.vue";
import { createMachine, interpret } from "xstate";
import { ref } from "vue";
import type { Ref } from "vue";
import ZoneView from "../../Zone/ZoneView.vue";

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
        SELECT: "zoneSelected",
      },
    },
    zoneSelected: {
      // type: "final",
      on: {
        ABANDON: "zoneSelect",
      },
    },
  },
});

const stateService = interpret(stateMachine)
  .onTransition((state) => {
    console.log("new state", state.value);
    view.value = state.value as string;
  })
  .start();

function joinZone(id: number) {
  console.log("joining zone ", id);
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
  socket.emit("instance:abandon-run");
  stateService.send("ABANDON");
}
</script>

<template>
  <div class="main-story">
    <ZoneSelect
      v-if="view === 'zoneSelect'"
      @zone-select="(id) => joinZone(id)"
    />
    <ZoneView
      v-if="view === 'zoneSelected'"
      :zone-id="zoneId"
      @abandon-run="abandonRun"
    />
  </div>
</template>

<style scoped>
.main-story {
  padding: 5px;
}
</style>
