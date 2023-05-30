import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  GameServerToClientEvents,
  GameClientToServerEvents,
} from "../../../common/events/gameServerEvents";
import getCookie from "../utils/getCookie";

interface State {
  connected: boolean;
  fooEvents: Array<any>;
}

export const state: State = reactive({
  connected: false,
  fooEvents: [],
});

export const socket: Socket<
  GameServerToClientEvents,
  GameClientToServerEvents
> = io("http://localhost:4000/game", {
  autoConnect: false,
  withCredentials: true,
  auth(cb) {
    cb({
      sessionId: getCookie("sessionId"),
      characterName: localStorage.getItem("characterName"),
    });
  },
});

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

