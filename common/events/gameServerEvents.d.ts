import { Message } from "../../game-server/src/components/message";
import type Lobby from "../../game-server/src/game/lobby/lobby";
import { MembersOnlyLobbyData } from "../../game-server/src/game/lobby/lobby";

export interface ClientToServerEvents {
  "chat:send": (content: string) => void;
  "chat:join": (room: number) => void;
  "lobby:getAll": () => void;
  "lobby:getCurrent": () => void;
  "lobby:create": (lobbyName: string) => void;
  "lobby:join": (lobbyId: string) => void;
  "lobby:leave": () => void;
}

export interface ServerToClientEvents {
  character: (character: any) => void;
  "chat:message": (message: Message) => void;
  "lobby:all": (lobbies: { [lobbyId: string]: Lobby }) => void;
  "lobby:set": (lobby: Lobby) => void;
  "lobby:data": (lobby: MembersOnlyLobbyData | null) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
