<script lang="ts" setup>
import * as gameServer from "../../../src/socket/gameServer";
import { watch } from "vue";
import router from "../../router";
import { onBeforeMount } from "vue";
import CombatRoom from "./instance-rooms/CombatRoom.vue";

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
  <CombatRoom v-if="gameServer.state.instance?.room?.type === 'combat'" />
</template>
