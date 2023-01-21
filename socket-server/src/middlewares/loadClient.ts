import { Socket } from "socket.io";
import ClientStorage from "../helpers/ClientStorage";
import CharacterModel from "../db/models/CharacterModel";
import logger from "../logger";

// authenticates using credentials passed by client
// and creates a Client object stored in ClientStorage if not already existing
const loadClient = async (socket: Socket, next: Function) => {
  const { username, sessionId, characterId } = socket.handshake.auth;
  if (!username || !sessionId || !characterId || characterId.length !== 24) {
    return socket.disconnect();
  }

  const characterModel = new CharacterModel(username, sessionId, characterId);

  const character = await characterModel.data();

  if (character === null) {
    logger.info("failed to get character data");
    socket.disconnect();
  }

  const client = ClientStorage.addClient(username, character);
  socket.data.client = client;

  return next();
};

export default loadClient;
