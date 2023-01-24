import type { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";

class Player {
  character: Character;
  #characterModel: CharacterModel;

  constructor(character: Character, characterModel: CharacterModel) {
    this.character = character;
    this.#characterModel = characterModel;
  }
}

export default Player;