<script lang="ts" setup>
import { onMounted } from "vue";
import { ref } from "vue";

const signInForm = ref();
const signUpForm = ref();

const isSigninView = ref(true);

const signInUsername = ref("");
const signInPassword = ref("");

const signUpUsername = ref("");
const signUpEmail = ref("");
const signUpPassword = ref("");

async function signInSubmit(e: Event) {
  e.preventDefault();
  console.log(signInUsername.value, signInPassword.value);

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    body: new URLSearchParams({
      username: signInUsername.value,
      password: signInPassword.value,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    // TODO: display this data in a modal
    console.log(result.error);
  }
}

function signUpSubmit(e: Event) {
  e.preventDefault();
  console.log(signUpUsername.value, signUpEmail.value, signUpPassword.value);
}

onMounted(() => {
  console.log(signInForm.value)
  console.log(signUpForm.value)
});
</script>

<template>
  <main>
    <form v-show="isSigninView" @submit="signInSubmit($event)" ref="signInForm">
      <h1>Signin</h1>
      <input
        tabindex="0"
        type="text"
        placeholder="Username"
        required
        minlength="6"
        maxlength="30"
        v-model="signInUsername"
      />
      <input
        tabindex="0"
        type="password"
        placeholder="Password"
        required
        minlength="8"
        maxlength="128"
        v-model="signInPassword"
      />

      <button type="submit">Sign in</button>
    </form>

    <form v-show="!isSigninView" @submit="signUpSubmit($event)" ref="signUpForm">
      <h1>Signup</h1>
      <input
        tabindex="0"
        type="text"
        placeholder="username"
        required
        minlength="6"
        maxlength="30"
        v-model="signUpUsername"
      />
      <input
        tabindex="0"
        type="email"
        required
        minlength="6"
        maxlength="254"
        placeholder="email"
        v-model="signUpEmail"
      />
      <input
        tabindex="0"
        type="password"
        required
        minlength="8"
        maxlength="128"
        placeholder="password"
        v-model="signUpPassword"
      />

      <button type="submit">Register</button>
    </form>

    <hr />

    <p v-if="isSigninView">
      New Player?
      <span tabindex="0" @click="isSigninView = false" class="link"
        >Register now</span
      >
    </p>

    <p v-else>
      Already Registered?
      <span tabindex="0" @click="isSigninView = true" class="link"
        >Sign in</span
      >
    </p>
  </main>
</template>

<style scoped>
main {
  max-width: 480px;
  margin: 0px auto;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

hr {
  margin-top: 20px;
}

h1 {
  font-size: 2.2rem;
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

form input {
  background-color: rgb(255, 255, 255, 0.85);
  font-size: 20px;
  box-sizing: border-box;
}

form input,
button {
  height: 45px;
  border-radius: 5px;
  border: none;
  padding: 10px 15px;
}

form button {
  margin-top: 20px;
}

p {
  margin: 0;
}
</style>
