import type { Server } from "socket.io";
import type { Message } from "./components/message.ts";
import type { LobbyData, MembersOnlyLobbyData } from "./game/lobby/lobby.js";
import type Instance from "./game/instance/instance.js";
import type { Character } from "common/types/character.js";
import type Client from "./components/client/client.js";
import type { StateUpdate } from "./game/rooms/combatRoom.js";

// because it won't get imported from socket.io/dist/namespace.d.ts for some reason
interface ExtendedError extends Error {
  data?: any;
}

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

interface SocketData {
  isAuthenticated: boolean;
  client: Client;
}

export type Io = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>;

// export type IoSocket = Socket<
//   ClientToServerEvents,
//   ServerToClientEvents,
//   InterServerEvents,
//   SocketData
// >;
