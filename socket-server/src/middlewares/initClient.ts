import { Socket } from "socket.io";
import ClientStorage from "../helpers/ClientStorage";
import CharacterModel from "../db/models/CharacterModel";
import calculateCharacterProperties from "../helpers/calculateCharacterProperties";

/**
 * Fetches the character from the database and instantiates a Client
 * object (if not already existing and the same character is used).
 * 
 * The client object is passed through socket.data to the entry point,
 * and then may be passed to event handler functions, for example:
 *   const { client } = socket.data;
 *   registerChatHandler(io, socket, client);
 */
const initClient = async (socket: Socket, next: Function) => {
  const { username, sessionId, characterId } = socket.handshake.auth;

  // TODO: use Joi for validation
  if (!username || !sessionId || !characterId || characterId.length !== 24) {
    return next(new Error("Invalid credentials"))
  }

  const characterModel = new CharacterModel(username, sessionId, characterId);

  const character = await characterModel.getCharacterData();

  if (character === null) {
    return next(new Error("Failed to load character data"));
  }

  const existingClient = ClientStorage.getClientByUsername(username);
  if (existingClient?.isConnected) {
    return next(new Error("This character is already in game"));
  }

  const client = ClientStorage.addClient(
    socket.id,
    username,
    character,
    characterModel
  );

  // calculate properties that don't get persisted like maxHp, maxMp, attributes, resistances
  calculateCharacterProperties(character);

  // restore hp and mp to full if client is not in an instance, which would otherwise equal to 0
  if (client.instance == null) {
    const { resources } = client.character;
    resources.hp = resources.maxHp;
    resources.mp = resources.maxMp;
  }

  socket.data.client = client;
  next();
};

export default initClient;
