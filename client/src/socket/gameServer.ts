import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../common/events/gameServerEvents";
import getCookie from "../utils/getCookie";
import useCharacterStore from "../stores/characterStore";
import { StaticCharacter } from "../../../common/types";
import { Message } from "../../../game-server/src/components/message";

interface State {
  connected: boolean;
  messageEvents: Array<Message>;
}
export const state: State = reactive({
  connected: false,
  messageEvents: [],
});

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:4000/",
  {
    autoConnect: false,
    withCredentials: true,
    auth(cb) {
      cb({
        sessionId: getCookie("sessionId"),
        characterName: localStorage.getItem("characterName"),
      });
    },
  }
);

socket.on("connect", () => {
  state.connected = true;
  socket.emit("join", 1);
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("character", (character: StaticCharacter) => {
  const characterStore = useCharacterStore();
  characterStore.setStaticCharacter(character);
});

socket.on("message", (message) => {
  state.messageEvents.push(message);
});
