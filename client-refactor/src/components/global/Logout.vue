<script lang="ts" setup>
import { inject } from "vue";
import type { VueCookies } from "vue-cookies";
import router from "../../router";
import { useUserStore } from "../../stores/userStore";

const $cookies = inject<VueCookies>("$cookies");

const userStore = useUserStore();

function logout() {
  const cookieExists = $cookies?.get("sessionId");
  const removed = $cookies?.remove("sessionId");
  if (!cookieExists || removed) {
    userStore.setSignedOut();
    router.push("/");
  }
}
</script>

<template>
  <button @click="logout">Logout</button>
</template>
