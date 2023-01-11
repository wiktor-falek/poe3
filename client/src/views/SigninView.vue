<script setup>
import { ref } from "vue";
import { useAuthStore } from "../stores/authStore";

const authStore = useAuthStore();

const username = ref("");
const password = ref("");

const submit = () => {
  const url = "http://localhost:3000/auth/login";
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
    }),
  };
  fetch(url, options).then((response) => {
    if (response.status === 200 || response.status === 304) {
      
      authStore.setIsAuthenticated(true);
      window.location.href = "/";
      return;
    }
    if (response.status === 401) {
      authStore.setIsAuthenticated(false);
    }
  });
};
</script>

<template>
  <main>
    <div class="center">
      <div class="panel">
        <h2>Welcome back</h2>
        <form @submit.prevent="">
          <label for="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            v-model="username"
          />

          <label for="Password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
          />

          <button @click="submit">Login</button>
        </form>
        <p>Not registered? <a href="/signup">Sign up here</a></p>
      </div>
    </div>
  </main>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  text-align: left;
  font-size: 20px;
    /* gap: 15px; */
}

input {
  height: 30px;
  min-width: 250px;
  margin-bottom: 25px;
  font-size: 20px;
}

button {
  width: 100%;
}

.center {
  display: flex;
  align-items: center;
  padding-left: 170px;
  margin: auto;
  height: 720px;
  width: 1280px;
  background: url("../assets/dungeon.jpg");
  background-repeat: no-repeat;
}

.panel {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  width: fit-content;
  min-height: 450px;
  height: fit-content;
  background-color: rgba(83, 83, 83, 0.2);
  backdrop-filter: blur(3px);
  padding: 15px;
  border-radius: 18px;
}
</style>
