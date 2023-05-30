import { Socket } from "socket.io";
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from "../../../common/events/gameServerEvents.js";
import User from "../db/models/user.js";
import Joi from "joi";
import Character from "../db/models/character.js";

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
  console.log("authenticating", auth);

  const schema = Joi.object({
    sessionId: Joi.string()
      .regex(
        /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/
      )
      .required(),
    // username: Joi.string().required().min(6).max(30),
    characterName: Joi.string().required().min(3).max(24),
  });

  const result = schema.validate(auth);
  if (result.error) {
    console.log(result.error);
    const err: ExtendedError = new Error("Invalid session");
    console.log(err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }

  interface Result {
    sessionId: string;
    username: string;
    characterName: string;
  }

  const { sessionId, characterName } = result.value as Result;

  const fetchUserPromise = User.findBySessionId(sessionId);
  const fetchCharacterPromise = Character.findByName(characterName);

  const user = await fetchUserPromise;
  const character = await fetchCharacterPromise;

  if (user === null) {
    const err: ExtendedError = new Error("User not found");
    console.log("ERROR", err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }
  
  if (character === null) {
    const err: ExtendedError = new Error("Character not found");
    console.log("ERROR", err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }
  
  if (character.username !== user.account.username) {
    const err: ExtendedError = new Error("What are you trying to do? ._.");
    console.log("ERROR", err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }

  socket.emit("character", character);

  // @ts-ignore hack to share the data between all namespaces
  socket.client.isAuthenticated = true;

  next();
}

export default authenticate;
