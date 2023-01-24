import type { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";

interface Result {
  ok: boolean;
  value?: any;
}

class Player {
  character: Character;
  #characterModel: CharacterModel;

  constructor(character: Character, characterModel: CharacterModel) {
    this.character = character;
    this.#characterModel = characterModel;
  }

  async addSilver(amount: number): Promise<Result> {
    const result = await this.#characterModel.addSilver(amount);
    if (result) {
      this.character.silver += amount;
      return { ok: true, value: this.character.silver };
    }
    return { ok: false };
  }
}

export default Player;
