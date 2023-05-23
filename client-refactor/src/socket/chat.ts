import { reactive } from "vue";
import { io } from "socket.io-client";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

const sessionId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("sessionId="))
  ?.split("=")[1];

export const socket = io("http://localhost:4000/chat", {
  autoConnect: false,
  auth: {
    sessionId,
  },
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});
