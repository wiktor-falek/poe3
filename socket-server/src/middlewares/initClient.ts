import { Socket } from "socket.io";
import ClientStorage from "../helpers/ClientStorage";
import CharacterModel from "../db/models/CharacterModel";
import logger from "../logger";
import { startingAttributes } from "../constants/attributes";
import { CharacterClass } from "../../*";
import calculateCharacterProperties from "../helpers/calculateCharacterProperties";

// fetches the character from the database and creates a
// Client object stored in ClientStorage if not already existing
const initClient = async (socket: Socket, next: Function) => {
  const { username, sessionId, characterId } = socket.handshake.auth;

  // basic validation
  if (!username || !sessionId || !characterId || characterId.length !== 24) {
    return socket.disconnect();
  }

  const characterModel = new CharacterModel(username, sessionId, characterId);

  const character = await characterModel.data();

  if (character === null) {
    // character not found which means credentials were incorrect
    logger.info("failed to get character data");
    return socket.disconnect();
  }

  // TODO: make getting a client take characterId as a parameter
  // which would allow to NOT allow connection if another character was used
  // (right now multiple characters can connect at once, and access instance, but they disappear if reloaded )
  const client = ClientStorage.addClient(username, character, characterModel);

  // calculate properties that don't get stored in db like maxHp, maxMmp, attributes, resistances
  calculateCharacterProperties(character);

  // restore hp and mp if character is not in an instance
  if (client.instance == null) {
    character.resources.hp = character.resources.maxHp;
    character.resources.mp = character.resources.maxMp;
  }

  // emit the character data
  socket.emit("character:data", client.characterModelProxy.character);

  socket.data.client = client;
  return next();
};

export default initClient;
