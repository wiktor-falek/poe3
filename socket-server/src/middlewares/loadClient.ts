import { Socket } from "socket.io";
import User from "../db/models/User";
import ClientStorage from "../helpers/ClientStorage";
import type { Character } from "../../*";

// authenticates using credentials passed by client
// and creates a Client object stored in ClientStorage if not already existing
const loadClient = async (socket: Socket, next: Function) => {
  const { username, sessionId } = socket.handshake.auth;

  if (!username || !sessionId) {
    return socket.disconnect();
  }

  const character: Character | null = await User.findCurrentCharacter(username, sessionId);
  if (character === null || character === undefined) {
    return socket.disconnect();
  }
  const client = ClientStorage.addClient(username, character);
  socket.data.client = client;

  return next();
};

export default loadClient;
