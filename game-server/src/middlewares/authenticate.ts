import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../common/events/gameServerEvents.js";
import User from "../db/models/user.js";
import Joi from "joi";


async function authenticate(
  socket: Socket<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >,
  next: (err?: ExtendedError | undefined) => void
) {
  const { auth } = socket.handshake;

  const schema = Joi.string()
    .regex(
      /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/
    )
    .required();

  const result = schema.validate(auth.sessionId);
  if (result.error) {
    const err: ExtendedError = new Error("Invalid session");
    // err.data = { content: "Additional details" };
    return next(err);
  }

  const sessionId = result.value;

  const user = await User.findBySessionId(sessionId);

  if (user === null) {
    const err: ExtendedError = new Error("User not found");
    // err.data = { content: "Additional details" };
    return next(err);
  }

  next();
}

export default authenticate;
