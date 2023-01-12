import { Socket } from "socket.io";
import type { Character } from "../../*";
import User from "../db/models/User";
import ClientStorage from "../helpers/ClientStorage";

// finds current character that matches username and sessionId passed on handshake
// and sets it inside socket.data namespace
const loadClient = async (socket: Socket, next: Function) => {
  const { username, sessionId } = socket.handshake.auth;

  if (!username || !sessionId) {
    return socket.disconnect();
  }

  const character: Character | null = await User.findCurrentCharacter();
  if (character === null || character === undefined) {
    return socket.disconnect();
  }

  const client = ClientStorage.addClient(username, character);
  socket.data.client = client;

  return next();
};

export default loadClient;
