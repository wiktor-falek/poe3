import { Character } from "../../*";
import Instance from "../logic/Instance";
import Player from "../logic/Player";

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
    this.instance = new Instance(zoneId);
  }
}

export default Client;
