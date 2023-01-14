import { Character } from "../../*";
import Player from "../logic/Player";

class Client {
  username: string;
  player: Player;

  constructor(username: string, character: Character) {
    this.username = username;
    this.player = new Player(character);
  }
}

export default Client;
