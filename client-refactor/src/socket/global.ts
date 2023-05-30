import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../common/events/gameServerEvents";
import getCookie from "../utils/getCookie";

interface State {
  connected: boolean;
}
export const state: State = reactive({
  connected: false,
});

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:4000/",
  {
    autoConnect: false,
    withCredentials: true,
    auth(cb) {
      cb({
        sessionId: getCookie("sessionId"),
        // username: localStorage.getItem("username"),
        characterName: localStorage.getItem("characterName"),
      });
    },
  }
);

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

// TODO: change any to Character interface
socket.on("character", (character: any) => {
  console.log(character);
});
