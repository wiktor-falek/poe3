<script lang="ts" setup>
import { ref } from "vue";

const urlParams = new URLSearchParams(window.location.search);

const verified = ref(urlParams.get("verified") === "true");
const username = ref(urlParams.get("username"));
const error = ref(urlParams.get("error"));
</script>

<template>
  <main>
    <div v-if="verified">
      <h1>
        <span>Hi, {{ username }}!</span>
        Your email has been verified.
      </h1>
      <p>
        <RouterLink to="/signin">Sign in here</RouterLink>
      </p>
      <p>
        <RouterLink to="/">Go back to home page</RouterLink>
      </p>
    </div>
    <div v-else>
      <h1>
        {{ error }}
      </h1>
    </div>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 10px;
}

h1 {
  font-size: 1.6rem;
}
</style>
