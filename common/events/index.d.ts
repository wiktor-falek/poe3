import { Message } from "../../socket-server-refactor/src/components/message";

// main namespace types
export interface ClientToServerEvents {
  hello: () => void;
}

export interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {}

// "/chat" namespace types

export interface ChatClientToServerEvents {
  message: (content: string) => void;
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
