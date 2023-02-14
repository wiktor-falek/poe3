import type { Character } from "../../*";
import CharacterModel from "../db/models/CharacterModel";

interface Result {
  ok: boolean;
  value?: any;
}

/**
 * Interface for querying CharacterModel, which also modifies the character object if query is successful
 */
// TODO: Name of this class is kinda confusing, because it doesn't even have anything to do with Player
// It's more like a proxy for CharacterModel that has some side effect
class PlayerModel {
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

  async addItem(item: any) {
    const result = await this.#characterModel.addItem(item, this.character);
    if (result.ok) {
      // mutate this.character.inventory
      const idx = result.inventoryIndex;
      this.character.inventory[idx] = item;
    }
    return result;
  }
  async swapIndices(firstIndex: number, secondIndex: number) {
    const result = await this.#characterModel.swapIndices(
      firstIndex,
      secondIndex
    );
    if (result.ok) {
      const [first, second] = result.swappedIndices;
      const inventory = this.character.inventory;
      // [inventory[0], inventory[1]] = [inventory[1], inventory[0]];
    }
    return result;
  }
}

export default PlayerModel;
