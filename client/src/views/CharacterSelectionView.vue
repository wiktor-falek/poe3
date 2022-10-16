<script setup>
  import { ref } from "vue";
import CharacterSelection from "../components/CharacterSelect/CharacterSelection.vue";
import NotSignedInView from "./NotSignedInView.vue";

const isAuthenticated = ref(localStorage.getItem("isAuthenticated") === "true");

</script>

<template>
  <main>
    <CharacterSelection v-if="isAuthenticated" />
    <div v-else>
      <NotSignedInView />
    </div>
  </main>
</template>