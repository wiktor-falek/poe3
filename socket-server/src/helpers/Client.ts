import { Character } from "../../*";
import Instance from "../logic/Instance";
import Player from "../logic/Player";
import logger from "../logger";
import CharacterModel from "../db/models/CharacterModel";

class Client {
  isConnected: boolean;
  username: string;
  player: Player;
  instance: Instance | null;
  constructor(username: string, character: Character, characterModel: CharacterModel) {
    this.isConnected = false;
    this.username = username;
    this.player = new Player(character, characterModel);
    this.instance = null;
  }

  joinInstance(zoneId: number): Instance | null {
    // joins existing instance or creates a new one
    if (this.instance !== null) {
      logger.info(
        `${this.username} joined existing instance with zoneId=${zoneId}`
      );
      return this.instance;
    }

    this.instance = new Instance(zoneId, this.player.character.name);
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
    this.instance = null;
  }
}

export default Client;
