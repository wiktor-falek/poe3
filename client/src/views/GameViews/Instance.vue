<script lang="ts" setup>
import { onMounted } from "vue";
import * as gameServer from "../../../src/socket/gameServer";
import { watch } from "vue";
import router from "../../router";

function leaveInstance() {
  gameServer.socket.emit("instance:leave");
}

onMounted(() => {
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
  <p>{{ gameServer.state.instance }}</p>
  <button @click="leaveInstance">Leave Instance</button>
</template>
