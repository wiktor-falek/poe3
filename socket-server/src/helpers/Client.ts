import { Character } from "../../*";

class Client {
  username: string;
  character: Character;

  constructor(username: string, character: Character) {
    this.username = username;
    this.character = character;
  }
}

export default Client;