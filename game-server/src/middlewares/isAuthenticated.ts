import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../common/events/gameServerEvents.js";

async function isAuthenticated(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (err?: ExtendedError | undefined) => void
) {
  // @ts-ignore
  const isAuthenticated: boolean = socket.client.isAuthenticated ?? false;
  console.log({ isAuthenticated });

  if (!isAuthenticated) {
    const err: ExtendedError = new Error("Authentication failed");
    console.log(err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }

  next();
}

export default isAuthenticated;
