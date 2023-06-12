<script lang="ts" setup>
import * as gameServer from "../../../src/socket/gameServer";
import { watch } from "vue";
import router from "../../router";
import { onBeforeMount } from "vue";

function leaveInstance() {
  gameServer.socket.emit("instance:leave");
}

onBeforeMount(() => {
  if (gameServer.state.instance === null) {
    router.push("/game/lobby");
  }
  watch(
    () => gameServer.state.instance,
    (newInstance, _) => {
      if (newInstance === null) {
        router.push("/game/lobby");
      }
    }
  );
});
</script>

<template>
  <h1>Instance</h1>
  <button @click="leaveInstance">Leave Instance</button>
</template>
