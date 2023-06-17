import { reactive } from "vue";
import { io, Socket } from "socket.io-client";
import type { ServerToClientEvents, ClientToServerEvents } from "../../../common/gameServerEvents";
import getCookie from "../utils/getCookie";
import useCharacterStore from "../stores/characterStore";
import { StaticCharacter } from "../../../common/index";
import { Message } from "../../../game-server/src/components/message";
import { LobbyData, MembersOnlyLobbyData } from "../../../game-server/src/game/lobby/lobby";
import type Instance from "../../../game-server/src/game/instance/instance";

interface State {
  connected: boolean;
  messages: Array<Message>;
  lobbies: { [lobbyId: string]: LobbyData };
  lobby: MembersOnlyLobbyData | null;
  instance: Instance | null;
  currentTurnPlayer: string;
}

export const state: State = reactive({
  connected: false,
  messages: [],
  lobbies: {},
  lobby: null,
  instance: null,
  currentTurnPlayer: "",
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

socket.on("chat:message", message => {
  state.messages.push(message);
});

socket.on("lobby:all", lobbies => {
  state.lobbies = lobbies;
});

socket.on("lobby:data", lobby => {
  state.lobby = lobby;
});

socket.on("lobby:set", lobby => {
  state.lobbies[lobby.id] = lobby;
});

socket.on("lobby:delete", lobbyId => {
  delete state.lobbies[lobbyId];
});

socket.on("instance:set", instance => {
  state.instance = instance;
});

socket.on("instance:player-turn", turnStartUpdate => {
  // TODO: clean this up or find a better way to sync state
  if (state.instance?.room) {
    state.currentTurnPlayer = turnStartUpdate.playerName;
    const players = state.instance.room.players;
    const player = players.find(player => player.name === turnStartUpdate.playerName);
    if (player) {
      if (turnStartUpdate.ap) {
        player.resources.ap = turnStartUpdate.ap;
      }
      if (turnStartUpdate.mp) {
        player.resources.mp = turnStartUpdate.mp;
      }
      if (turnStartUpdate.hp) {
        player.resources.hp = turnStartUpdate.hp;
      }
    }
  }
});

socket.on("instance:enemy-actions", actions => {
  for (const action of actions) {
    const players = state.instance?.room?.players;
    const target = players?.find(player => player.id === action.targetId);
    if (target) {
      target.resources.hp = Math.max(target.resources.hp - action.damage, 0);
    }
  }
});

socket.on("instance:player-action", action => {
  const enemies = state.instance?.room?.enemies;
  const players = state.instance?.room?.players;

  const attacker = players?.find(player => player.id === action.attackerId);
  if (attacker) {
    if (action.cost?.ap) {
      attacker.resources.ap -= action.cost.ap;
    }
    if (action.cost?.mp) {
      attacker.resources.mp -= action.cost.mp;
    }
    if (action.cost?.hp) {
      attacker.resources.hp -= action.cost.hp;
    }
  }

  const target = enemies?.find(enemy => enemy.id === action.targetId);
  if (target) {
    target.hp = Math.max(target.hp - action.damage, 0);
  }
});
