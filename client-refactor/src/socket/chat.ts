import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  ChatServerToClientEvents,
  ChatClientToServerEvents,
} from "../../../common/events/gameServerEvents";
import { Message } from "../../../game-server/src/components/message";
import getCookie from "../utils/getCookie";

interface State {
  connected: boolean;
  messageEvents: Array<Message>;
}

export const state: State = reactive({
  connected: false,
  messageEvents: [],
});

export const socket: Socket<
  ChatServerToClientEvents,
  ChatClientToServerEvents
> = io("http://localhost:4000/chat", {
  autoConnect: false,
  withCredentials: true,
  auth(cb) {
    cb({
      sessionId: getCookie("sessionId"),
      // username: localStorage.getItem("username"),
      characterName: localStorage.getItem("characterName"),
    });
  },
});

socket.on("connect", () => {
  state.connected = true;
  socket.emit("join", 1);
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("message", (message) => {
  console.log("message received");
  state.messageEvents.push(message);
});
