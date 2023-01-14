import type { Character } from "../../*";

class Player {
  character: Character;

  constructor(character: Character) {
    this.character = character;
  }

  loadCharacterData(character: Character) {
    this.character = character;
  }
}

export default Player;