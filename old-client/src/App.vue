<script setup>
import { RouterView } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const deleteCookies = () => {
  document.cookie = "username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  authStore.setIsAuthenticated(false);
  window.location.href = "/";
};

const iKnowThisShouldBeAnchor = () => {
  // TODO: make this button into an anchor with href="/" while preserving same style
  window.location.href = "/";
};

const switchButtonShouldRender = () => {
  return window.location.pathname !== "/";
};
</script>

<template>
  <header>
    <a class="logo" href="/">
      <p>Path of Exile 3</p>
    </a>
    <div class="options" v-if="authStore.isAuthenticated">
      <!-- <img src="../src/assets/icons/cogwheel.svg" alt="settings" style="height: 32px; width: auto; background-color: white;"> -->
      <a href="/" class="button" v-if="switchButtonShouldRender()"
        >Switch Character</a
      >
      <button class="button" @click="deleteCookies">LOGOUT</button>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
.logo {
  padding-left: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  text-decoration: none;
  color: white;
  user-select: none;
}

.options {
  display: flex;
  gap: 20px;
}
</style>
