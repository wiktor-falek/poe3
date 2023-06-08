import User from "../db/models/user.js";
import Joi from "joi";
import Character from "../db/models/character.js";
import { IoSocket } from "../index.js";
import ClientManager from "../components/client/clientManager.js";
import { StaticCharacter } from "../../../common/types/index.js";
import InstanceManager from "../game/instance/instanceManager.js";
import { ServerMessage } from "../components/message.js";

async function initialize(socket: IoSocket, next: (err?: ExtendedError | undefined) => void) {
  const { auth } = socket.handshake;

  const schema = Joi.object({
    sessionId: Joi.string()
      .regex(/[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/)
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

  const userWithId = await fetchUserPromise;
  const characterWithId = await fetchCharacterPromise;

  if (userWithId === null) {
    const err: ExtendedError = new Error("User not found");
    console.log("ERROR", err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }

  if (characterWithId === null) {
    const err: ExtendedError = new Error("Character not found");
    console.log("ERROR", err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }

  if (characterWithId.userId !== userWithId._id.toString()) {
    const err: ExtendedError = new Error("What are you trying to do? ._.");
    console.log("ERROR", err.message);
    // err.data = { content: "Additional details" };
    return next(err);
  }

  // get previously client created in recent session
  let client = ClientManager.getClientByUsername(userWithId.account.username);

  if (client !== undefined) {
    // update the socket reference of existing client
    client.socket = socket;
  }
  // if existing character does not match currently selected character
  // reinstantiate the client
  if (client === undefined || !client.character._id.equals(characterWithId._id)) {
    client = ClientManager.createClient(userWithId, characterWithId, socket);
  }

  const { _id, ...character } = characterWithId;
  socket.emit("character", character);

  socket.data.isAuthenticated = true;

  socket.data.client = client;

  // try to rejoin existing instance

  const { instanceId } = client;
  console.log({ instanceId: client.instanceId });
  console.log(InstanceManager.instances);
  if (instanceId !== null) {
    const instance = InstanceManager.getInstance(instanceId);
    if (instance !== undefined) {
      console.log("rejoining instance");
      console.log({ instance });
      const room = `instance:${instance.id}`;
      client.socket.join(room);
      socket.emit("instance:set", instance);
    }
  }

  next();
}

export default initialize;
