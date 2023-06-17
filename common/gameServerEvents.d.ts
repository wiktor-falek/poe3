import type { Message } from "../game-server/src/components/message.js";
import type { LobbyData, MembersOnlyLobbyData } from "../game-server/src/game/lobby/lobby.js";
import type Instance from "../game-server/src/game/instance/instance.js";
import { StaticCharacter } from "./index.js";

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
  "instance:action": (targetId: string, actionId: string) => void;
  "instance:end-turn": () => void;
}

export interface ServerToClientEvents {
  // global
  character: (character: StaticCharacter) => void;
  // chat
  "chat:message": (message: Message) => void;
  // lobby
  "lobby:all": (lobbies: { [lobbyId: string]: LobbyData }) => void;
  "lobby:data": (lobby: MembersOnlyLobbyData | null) => void;
  "lobby:set": (lobby: LobbyData) => void;
  "lobby:delete": (lobbyId: string) => void;
  // instance
  "instance:set": (instance: Instance | null) => void;
  "instance:player-turn": (playerName: string) => void;
  "instance:player-action": (action: any) => void;
  "instance:enemy-actions": (action: Array<any>) => void;
}

export interface InterServerEvents {
  ping: () => void;
}
