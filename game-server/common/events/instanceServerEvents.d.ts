import { Message } from "../../game-server/src/components/message";

// main namespace types
export interface ClientToServerEvents {
  hello: () => void;
}

export interface ServerToClientEvents {
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {}

// "/chat" namespace types

// export interface ChatClientToServerEvents {
//   message: (content: string) => void;
// }

// export interface ChatServerToClientEvents {
//   message: (message: Message) => void;
// }

// export interface ChatInterServerEvents {
//   // ...
// }

// export interface ChatSocketData {
//   // ...
// }
