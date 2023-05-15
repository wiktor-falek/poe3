import { reactive } from "vue";
import { io } from "socket.io-client";

const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

const socket = io("http://localhost:4000", { autoConnect: false });

export { state, socket };
