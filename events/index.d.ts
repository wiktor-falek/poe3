import ClientToServerEvents from "./clientToServerEvents";
import ServerToClientEvents from "./serverToClientEvents";
import InterServerEvents from "./interServerEvents";

interface SocketData {
  name: string;
  age: number;
}

export { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData };
