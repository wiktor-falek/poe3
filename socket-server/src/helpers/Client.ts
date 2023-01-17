import { Character } from "../../*";
import Instance from "../logic/Instance";
import Player from "../logic/Player";
import logger from "../logger";

class Client {
  username: string;
  player: Player;
  instance: Instance | null;

  constructor(username: string, character: Character) {
    this.username = username;
    this.player = new Player(character);
    this.instance = null;
  }

  joinInstance(zoneId: number) {
    if (this.instance === null) {
      this.instance = new Instance(zoneId);
      logger.info(`created instance for ${this.username} with zoneId=${zoneId}`);
    } else {
      logger.info(`${this.username} joined existing instance with zoneId=${zoneId}`);
    }
    
    logger.info(`${this.username} joined instance`);

    return this.instance;
  }
}

export default Client;
