import { StaticCharacter, User } from "../../../../common/types/index.js";

class Client {
  username: string;
  // #userId: string;
  #character: StaticCharacter;
  characterName: string;
  // #characterId: string;
  #isConnected: boolean;
  #disconnectTimestamp: number | null;
  constructor(
    user: User,
    // userId: string,
    character: StaticCharacter
  ) {
    // this.#userId = userId;
    // this.#characterId = characterId;
    this.#character = character;
    this.#isConnected = false;
    this.#disconnectTimestamp = null;
    
    this.username = user.account.username;
    this.characterName = character.name;
  }

  // get characterName() {
  // return this.character
  // }

  get isConnected() {
    return this.#isConnected;
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
