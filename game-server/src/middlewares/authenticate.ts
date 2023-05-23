import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../common/events/gameServerEvents";
import { ExtendedError } from "socket.io/dist/namespace";
import User from "../db/models/user";

async function authenticate(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (err?: ExtendedError | undefined) => void
) {
  const { sessionId } = socket.handshake.auth;

  // TODO: validate types

  const user = await User.findBySessionId(sessionId);

  if (user === null) {
    return next(new Error("Invalid credentials"));
  }

  next();
}

export default authenticate;
