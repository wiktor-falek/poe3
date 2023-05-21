<script lang="ts" setup>
import { ref } from "vue";
import type { Ref } from "vue";
import router from "../router";
import { useUserStore } from "../stores/userStore";

type View = "signin" | "signup" | "recovery";

const view: Ref<View> = ref("signin");

const signInUsername = ref("");
const signInPassword = ref("");

const signUpUsername = ref("");
const signUpEmail = ref("");
const signUpPassword = ref("");
const signUpConfirmPassword = ref("");

const recoveryEmail = ref("");

const errorMessage = ref("");

async function signInSubmit(e: Event) {
  e.preventDefault();

  const response = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    credentials: "include",
    body: new URLSearchParams({
      username: signInUsername.value,
      password: signInPassword.value,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    interface Result {
      authenticated: boolean;
      username: string;
    }
    const userStore = useUserStore();
    userStore.setSignedIn(result as Result);
    router.push("/select");
    // redirect
  } else {
    errorMessage.value = result.error;
  }
}

async function signUpSubmit(e: Event) {
  e.preventDefault();

  if (signUpPassword.value !== signUpConfirmPassword.value) {
    errorMessage.value = "Passwords do not match";
    return;
  }

  const response = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    body: new URLSearchParams({
      username: signUpUsername.value,
      email: signUpEmail.value,
      password: signUpPassword.value,
    }),
  });

  const result = await response.json();

  if (response.ok) {
    // TODO: inform the user that account has been successfully created
    setView("signin");
  } else {
    errorMessage.value = result.error;
  }
}

async function recoverySubmit(e: Event) {
  e.preventDefault();

  const response = await fetch("http://localhost:3000/auth/password/recover", {
    method: "POST",
    body: new URLSearchParams({
      email: recoveryEmail.value,
    }),
  });

  const result = await response.json();

  if (!result.ok) {
    // TODO: handle error
    // display result.error
    console.log(result.message);
    return;
  }

  // TODO: handle success
  // display result.message
  console.log(result.error);
}

function setView(viewName: View) {
  errorMessage.value = "";
  view.value = viewName;
}
</script>

<template>
  <main>
    <h1 v-show="view === 'signin'">Sign in</h1>
    <h1 v-show="view === 'signup'">Register</h1>
    <h1 v-show="view === 'recovery'">Forgot Password</h1>
    <form v-show="view === 'signin'" @submit="signInSubmit($event)">
      <input
        type="text"
        placeholder="Username"
        required
        minlength="6"
        maxlength="30"
        v-model="signInUsername"
      />
      <input
        type="password"
        placeholder="Password"
        required
        minlength="8"
        maxlength="128"
        v-model="signInPassword"
      />

      <p
        id="forgot-password"
        tabindex="0"
        @click="setView('recovery')"
        @keyup.enter="setView('recovery')"
        @keyup.space="setView('recovery')"
        class="link"
      >
        Forgot Password?
      </p>

      <p class="error">{{ errorMessage }}</p>

      <button type="submit">Sign In</button>
    </form>

    <form v-show="view === 'signup'" @submit="signUpSubmit($event)">
      <input
        type="text"
        placeholder="Username"
        required
        minlength="6"
        maxlength="30"
        v-model="signUpUsername"
      />
      <input
        type="email"
        required
        minlength="6"
        maxlength="254"
        placeholder="Email"
        v-model="signUpEmail"
      />
      <input
        type="password"
        required
        minlength="8"
        maxlength="128"
        placeholder="Password"
        v-model="signUpPassword"
      />
      <input
        type="password"
        required
        minlength="8"
        maxlength="128"
        placeholder="Confirm Password"
        v-model="signUpConfirmPassword"
      />

      <p class="error">{{ errorMessage }}</p>

      <button type="submit">Register</button>
    </form>

    <form v-show="view === 'recovery'" @submit="recoverySubmit($event)">
      <input
        type="email"
        required
        minlength="6"
        maxlength="254"
        placeholder="Email"
        v-model="recoveryEmail"
      />

      <p class="error">{{ errorMessage }}</p>

      <button id="recover" type="submit">Recover</button>
    </form>

    <hr />

    <p v-if="view === 'signin'">
      New Player?
      <span
        tabindex="0"
        @click="setView('signup')"
        @keyup.enter="setView('signup')"
        @keyup.space="setView('signup')"
        class="link"
        >Register now</span
      >
    </p>

    <p v-if="view === 'signup'">
      Already Registered?
      <span
        tabindex="0"
        @click="setView('signin')"
        @keyup.enter="setView('signin')"
        @keyup.space="setView('signin')"
        class="link"
        >Sign in</span
      >
    </p>

    <p v-if="view === 'recovery'">
      Remember you password?
      <span
        tabindex="0"
        @click="setView('signin')"
        @keyup.enter="setView('signin')"
        @keyup.space="setView('signin')"
        class="link"
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
  gap: 5px;
  padding: 10px;
}

hr {
  width: 99%;
  margin-top: 20px;
  margin-bottom: 0;
}

h1 {
  font-size: 2.2rem;
  text-align: center;
}

p {
  margin: 0;
}

#forgot-password {
  text-align: right;
  margin-top: 5px;
}

#recover {
  margin-top: 27px;
}

.error {
  color: rgb(211, 74, 74);
  margin-top: 15px;
  margin-bottom: 5px;
}
</style>
