<script setup>
import { RouterLink, RouterView } from "vue-router";
import { onMounted, ref } from "vue";
import router from "./router";
import { useAuthStore } from "@/stores/authStore";

const authStore = useAuthStore();

const deleteCookies = () => {
  document.cookie = "username=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  document.cookie =
    "sessionId=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
  localStorage.setItem("isAuthenticated", "false");
  window.location.href = "/";
};

const iKnowThisShouldBeAnchor = () => {
  // but im lazy so 🤷
  window.location.href = "/";
};

const switchButtonShouldRender = () => {
  return window.location.pathname !== "/";
};
</script>

<template>
  <header>
    <div class="logo">
      <p>Path of Exile 3</p>
    </div>
    <div class="options" v-if="authStore.isAuthenticated">
      <!-- <img src="../src/assets/icons/cogwheel.svg" alt="settings" style="height: 32px; width: auto; background-color: white;"> -->
      <button
        v-if="switchButtonShouldRender()"
        @click="iKnowThisShouldBeAnchor"
      >
        Switch Character
      </button>
      <button @click="deleteCookies">LOGOUT</button>
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
}

.options {
  display: flex;
  gap: 20px;
}
</style>
