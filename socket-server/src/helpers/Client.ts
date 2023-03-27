import { Character } from "../../*";
import Instance from "../logic/Instance";
import CharacterModelProxy from "../logic/CharacterModelProxy";
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
}

export default Client;
