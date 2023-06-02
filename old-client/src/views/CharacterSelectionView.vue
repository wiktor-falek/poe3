<script setup>
  import { ref } from "vue";
import CharacterSelection from "../components/CharacterSelect/CharacterSelection.vue";
import LandingView from "./LandingView.vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

</script>

<template>
  <main>
    <CharacterSelection v-if="authStore.isAuthenticated" />
    <div v-else>
      <LandingView />
    </div>
  </main>
</template>