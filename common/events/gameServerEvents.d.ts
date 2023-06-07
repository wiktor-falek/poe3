import { Message } from "../../game-server/src/components/message";
import type Lobby from "../../game-server/src/game/lobby/lobby";
import { MembersOnlyLobbyData } from "../../game-server/src/game/lobby/lobby";

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
}

export interface ServerToClientEvents {
  // global
  character: (character: any) => void;
  // chat
  "chat:message": (message: Message) => void;
  // lobby
  "lobby:all": (lobbies: { [lobbyId: string]: Lobby }) => void;
  "lobby:data": (lobby: MembersOnlyLobbyData | null) => void;
  "lobby:set": (lobby: Lobby) => void;
  "lobby:delete": (lobbyId: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
