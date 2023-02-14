import { Character } from "../../*";
import Instance from "../logic/Instance";
import CharacterModelProxy from "../logic/CharacterModelProxy";
import logger from "../logger";
import CharacterModel from "../db/models/CharacterModel";

class Client {
  isConnected: boolean;
  disconnectTimestamp: number | null;
  username: string;
  characterModelProxy: CharacterModelProxy;
  instance: Instance | null;
  constructor(
    username: string,
    character: Character,
    characterModel: CharacterModel
  ) {
    this.isConnected = false;
    this.disconnectTimestamp = null;
    this.username = username;
    this.characterModelProxy = new CharacterModelProxy(
      character,
      characterModel
    );
    this.instance = null;
  }

  connect() {
    this.isConnected = true;
    this.disconnectTimestamp = null;
  }

  disconnect() {
    this.isConnected = false;
    this.disconnectTimestamp = Date.now();
  }

  joinInstance(zoneId: number): Instance | null {
    // joins existing instance or creates a new one
    if (this.instance !== null) {
      logger.info(
        `${this.username} joined existing instance with zoneId=${zoneId}`
      );
      return this.instance;
    }

    this.instance = new Instance(
      zoneId,
      this.characterModelProxy.character.name
    );
    if (this.instance === null) {
      logger.error(
        `failed to create instance for ${this.username} (zoneId=${zoneId})`
      );
      return null;
    }

    logger.info(`created instance for ${this.username} (zoneId=${zoneId})`);
    logger.info(`${this.username} joined instance`);

    return this.instance;
  }

  abandonInstance() {
    logger.info(
      `${this.username} abandoned instance (zoneId=${this.instance?.zoneId})`
    );
    this.instance = null;
  }
}

export default Client;
