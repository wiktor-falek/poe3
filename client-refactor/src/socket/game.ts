import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  GameServerToClientEvents,
  GameClientToServerEvents,
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
  GameServerToClientEvents,
  GameClientToServerEvents
> = io("http://127.0.0.1:4000/game", {
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
