import { io, Socket } from "socket.io-client";
import { reactive } from "vue";
import getCookie from "../utils/getCookie";
import useCharacterStore from "../stores/characterStore";
import type { StaticCharacter } from "../../../common/types/index";
import type { LobbyData, MembersOnlyLobbyData } from "../../../game-server/src/game/lobby/lobby";
import type { Message } from "../../../game-server/src/components/message";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../common/types/gameServerEvents";
import type Instance from "../../../game-server/src/game/instance/instance";
import Queue from "../utils/queue";
import { StateUpdate } from "../../../game-server/src/game/rooms/combatRoom";

interface State {
  connected: boolean;
  messages: Array<Message>;
  lobbies: { [lobbyId: string]: LobbyData };
  lobby: MembersOnlyLobbyData | null;
  instance: Instance | null;
  instanceActionsQueue: Queue<StateUpdate>;
}

export const state: State = reactive({
  connected: false,
  messages: [],
  lobbies: {},
  lobby: null,
  instance: null,
  instanceActionsQueue: new Queue(),
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
  state.instanceActionsQueue.items = [];
  state.instance = instance;
});

socket.on("instance:state-update", async (state) => {
  // TODO: push state to instanceActionsQueue


  // TODO: move this to a setInterval callback and try to dequeue
  // const room = gameServer.state.instance!.room!;
  // // take all updates from the state.actions and update state incrementally with a delay
  // for (const action of state.actions) {
  //   const target = room.players.find((player) => player.id === action.targetId);
  //   if (target) {
  //     displayDamagePopup(action.attackerId, action.targetId, action.damage, action.critical);
  //     target.resources.hp = Math.max(target.resources.hp - action.damage, 0);
  //   }
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  // }
  // const { turnStartUpdate } = state;
  // if (turnStartUpdate) {
  //   const { playerId, resources } = turnStartUpdate;
  //   const player = room.players.find((player) => player.id === playerId);
  //   if (player) {
  //     if (resources) {
  //       if (resources.ap) {
  //         player.resources.ap = resources.ap;
  //       }
  //       if (resources.hp) {
  //         player.resources.hp = resources.hp;
  //       }
  //       if (resources.mp) {
  //         player.resources.mp = resources.mp;
  //       }
  //     }
  //     room.currentTurnPlayerName = player.name;
  //   }
  // }
});

socket.on("instance:player-action", (action) => {
  // const enemies = gameServer.state.instance?.room?.enemies;
  // const players = gameServer.state.instance?.room?.players;
  // const attacker = players?.find((player) => player.id === action.attackerId);
  // const target = enemies?.find((enemy) => enemy.id === action.targetId);
  // if (target) {
  //   displayDamagePopup(action.attackerId, action.targetId, action.damage, action.critical);
  //   target.hp = Math.max(target.hp - action.damage, 0);
  // }
  // if (attacker) {
  //   if (action.cost?.ap) {
  //     attacker.resources.ap -= action.cost.ap;
  //   }
  //   if (action.cost?.mp) {
  //     attacker.resources.mp -= action.cost.mp;
  //   }
  //   if (action.cost?.hp) {
  //     attacker.resources.hp -= action.cost.hp;
  //   }
  // }
});
