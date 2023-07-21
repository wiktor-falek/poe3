import type { Socket, Server } from "socket.io";
import type { Message } from "./src/components/message.ts";
import type {
  LobbyData,
  MembersOnlyLobbyData,
} from "./src/game/lobby/lobby.js";
import type Instance from "./src/game/instance/instance.js";
import type { Character } from "common/types/character.js";
import type Client from "./src/components/client/client.js";
import type { StateUpdate } from "./src/game/rooms/combatRoom.js";

export interface ClientToServerEvents {
  "chat:send": (content: string) => void;
  "chat:join": (room: number) => void;
  "lobby:getAll": () => void;
  "lobby:getCurrent": () => void;
  "lobby:create": (lobbyName: string) => void;
  "lobby:join": (lobbyId: string) => void;
  "lobby:leave": () => void;
  "lobby:kick": (characterName: string) => void;
  "instance:get": () => void;
  "instance:create": () => void;
  "instance:leave": () => void;
  "instance:action": (targetId: string, actionId: string) => void;
  "instance:end-turn": () => void;
}

export interface ServerToClientEvents {
  character: (character: Character) => void;
  "chat:message": (message: Message) => void;
  "lobby:all": (lobbies: { [lobbyId: string]: LobbyData }) => void;
  "lobby:data": (lobby: MembersOnlyLobbyData | null) => void;
  "lobby:set": (lobby: LobbyData) => void;
  "lobby:delete": (lobbyId: string) => void;
  "instance:set": (instance: Instance | null) => void;
  "instance:state-update": (turnStart: StateUpdate) => void;
  "instance:rewards": (rewards: Array<any>) => void; // TODO: any -> LootFactory.generateLoot() return type
  "instance:player-action": (stateUpdate: StateUpdate) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  isAuthenticated: boolean;
  client: Client;
}

export type Io = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

export type IoSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;
