import { Document } from "mongodb";
import { Socket } from "socket.io";
import User from "../db/User";

// finds current character that matches username and sessionId passed on handshake
// and sets it inside socket.data namespace
const getPlayerData = async (socket: Socket, next: Function): Promise<Document | null> => {
  const { username, sessionId } = socket.handshake.auth;

  if (!username || !sessionId) {
    return socket.disconnect();
  }

  const playerData = await User.findCurrentCharacter();

  if (playerData === null) {
    return socket.disconnect();
  }

  socket.data.userId = playerData._id.toString();
  socket.data.character = playerData.result[0];
  return next();
};

export default getPlayerData;
