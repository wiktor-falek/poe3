import { Character } from "../../*";
import Instance from "../logic/Instance";
import CharacterModelProxy from "../logic/CharacterModelProxy";
import logger from "../logger";
import CharacterModel from "../db/models/CharacterModel";
import Party from "./Party";

class Client {
  isConnected: boolean;
  disconnectTimestamp: number | null;
  socketId: string | null;
  username: string;
  characterModelProxy: CharacterModelProxy;
  party: Party;
  instance: Instance | null;
  constructor(
    socketId: string,
    username: string,
    characterData: Character,
    characterModel: CharacterModel
  ) {
    this.socketId = socketId;
    this.username = username;
    this.characterModelProxy = new CharacterModelProxy(
      characterData,
      characterModel
    );
    this.isConnected = false;
    this.disconnectTimestamp = null;
    this.party = new Party(this);
    this.instance = null;
  }

  get character() {
    return this.characterModelProxy.character;
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

    // CHANGE:
    this.instance = new Instance(zoneId);

    // Restore hp and mp since this is the first time joining
    const character = this.character;
    character.resources.hp = character.resources.maxHp;
    character.resources.mp = character.resources.maxMp;

    logger.info(`created instance for ${this.username} (zoneId=${zoneId})`);
    logger.info(`${this.username} joined instance`);

    return this.instance;
  }

  abandonInstance() {
    if (this.instance !== null && this.instance.zone !== null) {
      logger.info(
        `${this.username} abandoned instance (zoneId=${this.instance.zone.id})`
      );
      this.instance = null;
    }
  }
}

export default Client;
