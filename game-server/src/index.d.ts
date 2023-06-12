import { Server } from "socket.io";
import type { Socket } from "socket.io";
import type { ClientToServerEvents, ServerToClientEvents, InterServerEvents } from "../../common/events/gameServerEvents.js";
import type Client from "./components/client/client.js";
interface SocketData {
    isAuthenticated: boolean;
    client: Client;
}
declare const io: Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type Io = typeof io;
export type IoSocket = Socket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export {};
//# sourceMappingURL=index.d.ts.map