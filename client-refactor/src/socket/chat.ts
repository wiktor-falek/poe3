import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  ChatServerToClientEvents,
  ChatClientToServerEvents,
} from "../../../common/events/gameServerEvents";

const sessionId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("sessionId="))
  ?.split("=")[1];

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

export const socket: Socket<
  ChatServerToClientEvents,
  ChatClientToServerEvents
> = io("http://localhost:4000/chat", {
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
