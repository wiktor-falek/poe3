import { io, Socket } from "socket.io-client";
import { reactive } from "vue";
import getCookie from "../utils/getCookie";
import useCharacterStore from "../stores/characterStore";
import Queue from "../utils/queue";
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from "../../../game-server/socket";
import type { Character } from "../../../common/types/character";
import type {
  LobbyData,
  MembersOnlyLobbyData,
} from "../../../game-server/dist/game/lobby/lobby";
import type { Message } from "../../../game-server/dist/components/message";

import type Instance from "../../../game-server/dist/game/instance/instance";
import type { StateUpdate } from "../../../game-server/dist/game/rooms/combatRoom";

interface State {
  connected: boolean;
  messages: Array<Message>;
  lobbies: { [lobbyId: string]: LobbyData };
  lobby: MembersOnlyLobbyData | null;
  instance: Instance | null;
  rewards: Array<any> | null; // TODO: type
  instanceActionsQueue: Queue<StateUpdate>;
}

export const state: State = reactive({
  connected: false,
  messages: [],
  lobbies: {},
  lobby: null,
  instance: null,
  rewards: [
    {
      id: 42069,
      type: "wearable",
      name: "Short Bow",
      uniqueName: undefined,
      uniqueDescription: undefined,
      ilvl: 1,
      rarity: "magic",
      requirements: { level: 1 },
      modifiers: {
        base: [
          {
            modId: "physical_damage",
            description: "Physical Damage: #-#",
            values: [2, 4],
          },
          {
            modId: "critical_strike_chance",
            description: "Critical Strike Chance: #%",
            values: [5],
          },
        ],
        implicit: [],
        affix: {
          prefixes: [
            {
              modId: "to_life",
              description: "+# to Life",
              values: [5],
              tier: 10,
            },
          ],
          suffixes: [
            {
              modId: "to_dexterity",
              description: "+# to Dexterity",
              values: [2],
              tier: 10,
            },
          ],
        },
      },
      slot: "hand",
    },
    {
      id: 42069,
      type: "wearable",
      name: "Short Bow",
      uniqueName: undefined,
      uniqueDescription: undefined,
      ilvl: 1,
      rarity: "magic",
      requirements: { level: 1 },
      modifiers: {
        base: [
          {
            modId: "physical_damage",
            description: "Physical Damage: #-#",
            values: [2, 4],
          },
          {
            modId: "critical_strike_chance",
            description: "Critical Strike Chance: #%",
            values: [5],
          },
        ],
        implicit: [],
        affix: {
          prefixes: [
            {
              modId: "to_mana",
              description: "+# to Mana",
              values: [3],
              tier: 10,
            },
            {
              modId: "to_life_regeneration",
              description: "+# to Life Regeneration",
              values: [1],
              tier: 10,
            },
          ],
          suffixes: [
            {
              modId: "to_intelligence",
              description: "+# to Intelligence",
              values: [2],
              tier: 10,
            },
          ],
        },
      },
      slot: "hand",
    },
    {
      type: "material",
      id: "augmenting_core",
      name: "Augmenting Core",
      description:
        "Use in the Forge to attempt upgrading existing modifier of an item by one Tier.",
      stackable: true,
      stackSize: 1,
      maxStackSize: 20,
    },
  ],
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

socket.on("character", (character: Character) => {
  const characterStore = useCharacterStore();
  characterStore.setCharacter(character);
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
  // state.instanceActionsQueue.items = [];
  state.instance = instance;
});

socket.on("instance:rewards", (rewards) => {
  // store the rewards somewhere it belongs
  // make sure the rewards are still there on refresh (somewhere)
  // maybe the rewards should be in the instance/room for each client when emitting?
  state.rewards = rewards;
});
socket.on("instance:state-update", async (stateUpdate) => {
  state.instanceActionsQueue.enqueue(stateUpdate);
});
