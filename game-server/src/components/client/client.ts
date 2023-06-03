import { WithId } from "mongodb";
import { StaticCharacter, User } from "../../../../common/types/index.js";

class Client {
  #user: WithId<User>;
  #character: WithId<StaticCharacter>;
  #isConnected: boolean;
  #disconnectTimestamp: number | null;
  constructor(user: WithId<User>, character: WithId<StaticCharacter>) {
    this.#user = user;
    this.#character = character;
    this.#isConnected = false;
    this.#disconnectTimestamp = null;
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
