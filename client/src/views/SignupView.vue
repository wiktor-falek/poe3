<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter;

const username = ref("");
const password = ref("");
const email = ref("");

const submit = () => {
  const url = "http://localhost:3000/auth/register";
  const options = {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
    },
    body: JSON.stringify({
      username: username.value,
      password: password.value,
      email: email.value,
    }),
  };
  fetch(url, options).then((response) => {
    if (response.status === 200) {
      window.location.href = "/signin";
    }
  });
};
</script>

<template>
  <main>
    <div class="container">
      <h1>Sign up</h1>
      <form @submit.prevent="">
        <label for="username">Username</label>
        <input
          type="username"
          name="username"
          id="username"
          v-model="username"
        />

        <label for="email">Email</label>
        <input type="email" name="email" id="email" v-model="email" />

        <label for="Password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          v-model="password"
        />

        <button @click="submit">Register</button>
      </form>
      <p>Already have an account? <a href="/signin">Sign in here</a></p>
    </div>
  </main>
</template>

<style scoped>
.container {
  margin: 0px auto;
  padding-top: 80px;
  width: fit-content;
}
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label,
input,
button {
  max-width: 280px;
  min-height: 30px;
}
</style>
