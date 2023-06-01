<script lang="ts" setup>
import { useRouter } from "vue-router";
import { onUnmounted, onMounted, onBeforeMount, ref, watch } from "vue";
import * as global from "../socket/global";
import * as chat from "../socket/chat";
import * as game from "../socket/game";
import Chat from "../components/Chat.vue";
import CharacterOverview from "../components/CharacterOverview.vue";

const router = useRouter();

const characterName = localStorage.getItem("characterName");

onBeforeMount(() => {
  if (characterName === null) {
    router.push("/select");
  }
  global.socket.connect();
});

const showLoading = ref(true);

onMounted(() => {
  {
    // connect to namespaces once global connection passed authentication
    const unwatch = watch(global.state, () => {
      game.socket.connect();
      chat.socket.connect();
      unwatch()
    });
  }

  const start = Date.now();

  const unwatch = watch(game.state, () => {
    if (game.state.connected) {
      const end = Date.now();
      const timeSpentLoading = end - start;

      // if real load time was below MINIMUM_LOAD_TIME, timeout for the remaining duration
      const MINIMUM_LOAD_TIME = 800;
      const timeoutDuration = MINIMUM_LOAD_TIME - timeSpentLoading;

      setTimeout(() => {
        showLoading.value = false;
      }, timeoutDuration);

      unwatch();
    }
  });
});

onUnmounted(() => {
  game.socket.disconnect();
  chat.socket.disconnect();
});
</script>

<template>
  <main class="loading" v-if="showLoading">
    <div class="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </main>

  <main v-else :class="{ loaded: chat.state.connected }">
    <!-- <CharacterOverview /> -->
    <Chat />
  </main>
</template>

<style scoped>
.loaded {
  animation: fadein 0.2s;
}

@keyframes fadein {
  from {
    opacity: 0.2;
  }
  to {
    opacity: 1;
  }
}

.loading {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* https://loading.io/css/ */
.lds-roller {
  display: inline-block;
  position: relative;
  width: 80px;
  height: 80px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 40px 40px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #cef;
  margin: -4px 0 0 -4px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 63px;
  left: 63px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 68px;
  left: 56px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 71px;
  left: 48px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 72px;
  left: 40px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 71px;
  left: 32px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 68px;
  left: 24px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 63px;
  left: 17px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 56px;
  left: 12px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
