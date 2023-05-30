import { Message } from "../../game-server/src/components/message";

// global namespace types
export interface ClientToServerEvents {}

export interface ServerToClientEvents {
  character: (character) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {}

// "/chat" namespace types
export interface ChatClientToServerEvents {
  send: (content: string) => void;
  join: (room: number) => void;
}

export interface ChatServerToClientEvents {
  message: (message: Message) => void;
}

export interface ChatInterServerEvents {
  // ...
}

export interface ChatSocketData {
  // ...
}

// "/game" namespace types
export interface GameClientToServerEvents {
  // ...
}

export interface GameServerToClientEvents {
  // ...
}

export interface GameInterServerEvents {
  // ...
}

export interface GameSocketData {
  // ...
}
