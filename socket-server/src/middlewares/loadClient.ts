import { Socket } from "socket.io";
import User from "../db/models/User";
import ClientStorage from "../helpers/ClientStorage";
import type { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function sleep(ms: number) {
  await timeout(ms);
}

// authenticates using credentials passed by client
// and creates a Client object stored in ClientStorage if not already existing
const loadClient = async (socket: Socket, next: Function) => {
  const { username, sessionId, characterId } = socket.handshake.auth;
  if (!username || !sessionId || !characterId || characterId.length !== 24) {
    return socket.disconnect();
  }

  const characterModel = new CharacterModel(
    username,
    sessionId,
    characterId
  );

  const character = await characterModel.data();
  console.log("CHARACTER", character);
  if (character === null) {
    console.log("bruh moment has occurred");
    socket.disconnect();
  }

  const client = ClientStorage.addClient(username, character);
  socket.data.client = client;

  return next();
};

export default loadClient;
