import Joi from "joi";
import CharacterModel from "../db/models/characterModel.js";
import UserModel from "../db/models/userModel.js";
import { IoSocket } from "index.js";
import ClientManager from "../components/client/clientManager.js";
import InstanceManager from "../game/instance/instanceManager.js";
import { ExtendedError } from "index.js";

const Character = new CharacterModel();
const User = new UserModel();

async function initialize(
  socket: IoSocket,
  next: (err?: ExtendedError | undefined) => void
) {
  const { auth } = socket.handshake;

  const schema = Joi.object<{ sessionId: string; characterName: string }>({
    sessionId: Joi.string()
      .regex(
        /[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}/
      )
      .required(),
    characterName: Joi.string().required().min(3).max(24),
  });

  const result = schema.validate(auth);
  if (result.error) {
    const err: ExtendedError = new Error("Invalid session");
    console.log(err.message);
    return next(err);
  }

  const { sessionId, characterName } = result.value;

  const fetchUserPromise = User.findBySessionId(sessionId);
  const fetchCharacterPromise = Character.findByName(characterName);

  const user = await fetchUserPromise;
  const character = await fetchCharacterPromise;

  if (user === null) {
    const err: ExtendedError = new Error("User not found");
    console.log(err.message);
    return next(err);
  }

  if (character === null) {
    const err: ExtendedError = new Error("Character not found");
    console.log(err.message);
    return next(err);
  }

  if (character.userId !== user.id) {
    const err: ExtendedError = new Error("What are you trying to do? ._.");
    console.log(err.message);
    return next(err);
  }

  // get previously client created in recent session
  let client = ClientManager.getClientByUsername(user.username);

  if (client !== undefined) {
    // update the socket reference of existing client
    client.socket = socket;
  }
  // if existing character does not match currently selected character
  // reinstantiate the client
  if (client === undefined || client.character.id !== character.id) {
    client = ClientManager.createClient(user, character, socket);
  }

  socket.emit("character", character);

  socket.data.isAuthenticated = true;

  socket.data.client = client;

  // try to rejoin existing instance

  const { instanceId } = client;
  console.log({ instanceId: client.instanceId });
  if (instanceId !== null) {
    const instance = InstanceManager.getInstance(instanceId);
    const x = 1;

    if (instance) {
      client.socket.join(instance.socketRoom);
      socket.emit("instance:set", instance);
    }
  }

  next();
}

export default initialize;
