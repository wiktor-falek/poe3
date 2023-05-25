import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type {
  ChatServerToClientEvents,
  ChatClientToServerEvents,
} from "../../../common/events/gameServerEvents";
import { Message } from "../../../game-server/src/components/message";

const sessionId = document.cookie
  .split("; ")
  .find((row) => row.startsWith("sessionId="))
  ?.split("=")[1];

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
  auth: {
    sessionId,
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
  state.messageEvents.push(message);
});
