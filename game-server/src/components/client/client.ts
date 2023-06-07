import { WithId } from "mongodb";
import { StaticCharacter, User } from "../../../../common/types/index.js";
import { IoSocket } from "../../index.js";

class Client {
  #user: WithId<User>;
  #character: WithId<StaticCharacter>;
  #isConnected: boolean;
  #disconnectTimestamp: number | null;
  #socket: IoSocket;
  constructor(
    user: WithId<User>,
    character: WithId<StaticCharacter>,
    socket: IoSocket
  ) {
    this.#user = user;
    this.#character = character;
    this.#isConnected = false;
    this.#disconnectTimestamp = null;
    this.#socket = socket;
  }

  get character() {
    return this.#character;
  }

  get isConnected() {
    return this.#isConnected;
  }

  get username() {
    return this.#user.account.username;
  }

  get characterName() {
    return this.#character.name;
  }

  get disconnectedTimestamp() {
    return this.#disconnectTimestamp;
  }

  get socket() {
    return this.#socket;
  }

  get socketId() {
    return this.#socket.id;
  }

  set socket(socket: IoSocket) {
    this.#socket = socket;
  }

  setConnected() {
    this.#disconnectTimestamp = null;
    this.#isConnected = true;
  }

  setDisconnected() {
    this.#disconnectTimestamp = Date.now();
    this.#isConnected = false;
  }
}

export default Client;
