import { Socket } from "socket.io";
import User from "../db/models/User";

// finds current character that matches username and sessionId passed on handshake
// and sets it inside socket.data namespace
const getPlayerData = async (socket: Socket, next: Function) => {
  const { username, sessionId } = socket.handshake.auth;

  if (!username || !sessionId) {
    return socket.disconnect();
  }

  const character = await User.findCurrentCharacter();
  if (character === null || character === undefined) {
    return socket.disconnect();
  }

  console.log(character);



  socket.data.username = username;
  return next();
};

export default getPlayerData;
