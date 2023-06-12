import type { Message } from "../game-server/src/components/message";
import type { LobbyData, MembersOnlyLobbyData } from "../game-server/src/game/lobby/lobby";
import type InstanceData from "../game-server/src/game/instance/instance";

export interface ClientToServerEvents {
  // chat
  "chat:send": (content: string) => void;
  "chat:join": (room: number) => void;
  // lobby
  "lobby:getAll": () => void;
  "lobby:getCurrent": () => void;
  "lobby:create": (lobbyName: string) => void;
  "lobby:join": (lobbyId: string) => void;
  "lobby:leave": () => void;
  "lobby:kick": (characterName: string) => void;
  // instance
  "instance:create": () => void;
  "instance:leave": () => void;
}

export interface ServerToClientEvents {
  // global
  character: (character: any) => void;
  // chat
  "chat:message": (message: Message) => void;
  // lobby
  "lobby:all": (lobbies: { [lobbyId: string]: LobbyData }) => void;
  "lobby:data": (lobby: MembersOnlyLobbyData | null) => void;
  "lobby:set": (lobby: LobbyData) => void;
  "lobby:delete": (lobbyId: string) => void;
  // instance
  "instance:set": (instance: InstanceData | null) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
