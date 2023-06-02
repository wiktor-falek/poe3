<script lang="ts" setup>
import { ref } from "vue";

const newPassword = ref();
const confirmPassword = ref();

const urlParams = new URLSearchParams(window.location.search);
const token = ref(urlParams.get("token"));

async function changePassword(e: Event) {
  e.preventDefault();

  if (newPassword.value !== confirmPassword.value) {
    // TODO: display "Passwords do not match" error
    return;
  }

  if (token.value === null) {
    // TODO: display "Invalid token" or something
    return;
  }

  const response = await fetch("http://localhost:3000/auth/password/change", {
    method: "PUT",
    body: new URLSearchParams({
      password: newPassword.value,
      token: token.value,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    // TODO: handle error
    console.log(result.error);
    return;
  }

  console.log(result.message);
}
</script>

<template>
  <main>
    <h1>Password Recovery</h1>

    <form @submit="changePassword">
      <input
        type="password"
        placeholder="New Password"
        minlength="8"
        maxlength="30"
        required
        v-model="newPassword"
      />

      <input
        type="password"
        placeholder="Confirm Password"
        minlength="8"
        maxlength="30"
        required
        v-model="confirmPassword"
      />
      <button type="submit">Submit</button>
    </form>
  </main>
</template>

<style scoped>
h1 {
  font-size: 2.2rem;
  text-align: center;
}

main {
  margin: 0 auto;
  max-width: 480px;
}
</style>
