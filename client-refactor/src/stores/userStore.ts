import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useUserStore = defineStore("user", () => {
  const authenticated = ref(false);
  const username = ref("");

  // load persisted state from localStorage
  if (localStorage.getItem("authenticated") === "true") {
    authenticated.value = true;
  }

  if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username") ?? "";
  }

  function setSignedIn(data: { authenticated: boolean; username: string }) {
    authenticated.value = data.authenticated;
    username.value = data.username;
  }

  function setSignedOut() {
    authenticated.value = false;
    username.value = "";
  }

  watch(authenticated, () => {
    localStorage.setItem("authenticated", authenticated.value.toString());
  });

  watch(username, () => {
    localStorage.setItem("username", username.value);
  });

  return {
    authenticated,
    username,
    setSignedIn,
    setSignedOut,
  };
});
