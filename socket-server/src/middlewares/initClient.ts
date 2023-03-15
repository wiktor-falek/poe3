import { Socket } from "socket.io";
import ClientStorage from "../helpers/ClientStorage";
import CharacterModel from "../db/models/CharacterModel";
import logger from "../logger";
import calculateCharacterProperties from "../helpers/calculateCharacterProperties";

// Fetches the character from the database and instantiates a Client
// object (if not already existing with the same player character).
// The client can be then accessed through socket.data in index.ts,
// or through an argument passed to socket handler functions.
const initClient = async (socket: Socket, next: Function) => {
  const { username, sessionId, characterId } = socket.handshake.auth;

  // basic validation
  if (!username || !sessionId || !characterId || characterId.length !== 24) {
    return socket.disconnect();
  }

  const characterModel = new CharacterModel(username, sessionId, characterId);

  const character = await characterModel.getCharacterData();

  if (character === null) {
    // character not found which means credentials were incorrect
    logger.info(`failed to load character data for user ${username}`);
    return socket.disconnect();
  }

  // TODO: make getting a client take characterId as a parameter
  // which would allow to NOT allow connection if another character was used
  // (right now multiple characters can connect at once, and access instance, but they disappear if reloaded )
  const client = ClientStorage.addClient(
    socket.id,
    username,
    character,
    characterModel
  );

  // calculate properties that don't get persisted like maxHp, maxMp, attributes, resistances
  calculateCharacterProperties(character);

  // restore hp and mp to full if client is not in an instance
  if (client.instance == null) {
    const { resources } = client.character;
    resources.hp = resources.maxHp;
    resources.mp = resources.maxMp;
  }

  // emit the character data
  socket.emit("character:data", client.character);

  socket.data.client = client;
  return next();
};

export default initClient;
