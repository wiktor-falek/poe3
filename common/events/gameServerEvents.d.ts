import { Message } from "../../game-server/src/components/message";

// global namespace types
export interface ClientToServerEvents {
  // "/chat" namespace types
  send: (content: string) => void;
  join: (room: number) => void;

  // "/game" namespace types
  "lobby:getAll": () => void;
}

export interface ServerToClientEvents {
  // "/chat" namespace types
  message: (message: Message) => void;

  // "/game"
  character: (character: any) => void;
  "lobby:all": (lobbies: Array<any>) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  isAuthenticated: boolean;
}
