import { io, Socket } from "socket.io-client";
import { reactive } from "vue";
import getCookie from "../utils/getCookie";
import useCharacterStore from "../stores/characterStore";
import type { StaticCharacter } from "../../../common/index";
import type { LobbyData, MembersOnlyLobbyData } from "../../../game-server/src/game/lobby/lobby";
import type { Message } from "../../../game-server/src/components/message";
import type { ServerToClientEvents, ClientToServerEvents } from "../../../common/gameServerEvents";
import type Instance from "../../../game-server/src/game/instance/instance";

interface State {
  connected: boolean;
  messages: Array<Message>;
  lobbies: { [lobbyId: string]: LobbyData };
  lobby: MembersOnlyLobbyData | null;
  instance: Instance | null;
}

export const state: State = reactive({
  connected: false,
  messages: [],
  lobbies: {},
  lobby: null,
  instance: null,
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

socket.onAny((event, ...args) => {
  console.log(event, JSON.stringify(args, null, 2));
});

socket.on("connect", () => {
  state.connected = true;
  socket.emit("chat:join", 1);
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("character", (character: StaticCharacter) => {
  const characterStore = useCharacterStore();
  characterStore.setStaticCharacter(character);
});

socket.on("chat:message", (message) => {
  state.messages.push(message);
});

socket.on("lobby:all", (lobbies) => {
  state.lobbies = lobbies;
});

socket.on("lobby:data", (lobby) => {
  state.lobby = lobby;
});

socket.on("lobby:set", (lobby) => {
  state.lobbies[lobby.id] = lobby;
});

socket.on("lobby:delete", (lobbyId) => {
  delete state.lobbies[lobbyId];
});

socket.on("instance:set", (instance) => {
  state.instance = instance;
});
