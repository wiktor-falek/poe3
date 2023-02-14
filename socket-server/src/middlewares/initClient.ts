import { Socket } from "socket.io";
import ClientStorage from "../helpers/ClientStorage";
import CharacterModel from "../db/models/CharacterModel";
import logger from "../logger";

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

  socket.data.client = client;
  return next();
};

export default initClient;
