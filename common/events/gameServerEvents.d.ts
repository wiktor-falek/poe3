import { Message } from "../../game-server/src/components/message";
import type Lobby from "../../game-server/src/game/lobby/lobby";

export interface ClientToServerEvents {
  "chat:send": (content: string) => void;
  "chat:join": (room: number) => void;
  "lobby:getAll": () => void;
  "lobby:create": (lobbyName: string) => void;
  "lobby:join": (lobbyId: string) => void;
}

export interface ServerToClientEvents {
  character: (character: any) => void;
  "chat:message": (message: Message) => void;
  "lobby:all": (lobbies: Array<Lobby>) => void;
  "lobby:data": (lobby: Lobby) => void;
  "lobby:new": (lobby: Lobby) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
