import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../common/events/gameServerEvents";
import { ExtendedError } from "socket.io/dist/namespace";

export default function authenticate(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (err?: ExtendedError | undefined) => void
) {
  const { sessionId, characterName } = socket.handshake.auth;

  
  next();
}
