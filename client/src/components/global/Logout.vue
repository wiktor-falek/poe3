<script lang="ts" setup>
import { inject } from "vue";
import type { VueCookies } from "vue-cookies";
import router from "../../router";

const $cookies = inject<VueCookies>("$cookies");

function logout() {
  const cookieExists = $cookies?.get("sessionId");
  const removed = $cookies?.remove("sessionId");
  if (!cookieExists || removed) {
    router.push("/");
  }
}
</script>

<template>
  <button class="button" @click="logout">Logout</button>
</template>
