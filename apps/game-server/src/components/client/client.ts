import type { User, Character } from "@poe3/types";
import type { IoSocket } from "../../../types/socket.js";

class Client {
  user: User;
  character: Character;
  isConnected: boolean;
  disconnectTimestamp: number | null;
  socket: IoSocket;
  instanceId: string | null;
  constructor(user: User, character: Character, socket: IoSocket) {
    this.user = user;
    this.character = character;
    this.isConnected = false;
    this.disconnectTimestamp = null;
    this.socket = socket;
    this.instanceId = null;
  }

  setConnected() {
    this.disconnectTimestamp = null;
    this.isConnected = true;
  }

  setDisconnected() {
    this.disconnectTimestamp = Date.now();
    this.isConnected = false;
  }
}

export default Client;
