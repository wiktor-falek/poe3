import type {
  Character,
  CharacterEquipment,
  EquipmentSlot,
  InventorySlot,
} from "../../*";
import CharacterModel from "../db/models/CharacterModel";

interface Result {
  ok: boolean;
  value?: any;
}

/**
 * Interface for querying CharacterModel
 * Methods are identical to CharacterModel, but have a side effect that mutate
 * this.character object to match the updated result of the query in CharacterModel
 */
class CharacterModelProxy {
  character: Character;
  #characterModel: CharacterModel;

  constructor(character: Character, characterModel: CharacterModel) {
    this.character = character;
    this.#characterModel = characterModel;
  }

  async addSilver(amount: number): Promise<Result> {
    const result = await this.#characterModel.addSilver(amount);
    if (result) {
      // mutate character.silver
      this.character.silver += amount;
      return { ok: true, value: this.character.silver };
    }
    return { ok: false };
  }

  async addItem(item: any) {
    const result = await this.#characterModel.addItem(item, this.character);
    if (result.ok) {
      // mutate character.inventory
      const idx = result.inventoryIndex;
      this.character.inventory[idx] = item;
    }
    return result;
  }
  async swapInventoryIncides(firstIndex: number, secondIndex: number) {
    const inventory = this.character.inventory;

    if (
      firstIndex < 0 ||
      secondIndex < 0 ||
      firstIndex >= inventory.length ||
      secondIndex >= inventory.length
    ) {
      return { ok: false, reason: "Array index out of range" };
    }

    const firstItem = inventory[firstIndex];
    const secondItem = inventory[secondIndex];

    if (firstItem == null && secondItem == null) {
      return { ok: false, reason: "No items found" };
    }

    const result = await this.#characterModel.swapInventoryIncides(
      { index: firstIndex, item: firstItem },
      { index: secondIndex, item: secondItem }
    );
    if (result.ok) {
      // mutate character.inventory
      const [first, second] = result.swappedIndices;
      const inventory = this.character.inventory;
      [inventory[first], inventory[second]] = [
        inventory[second],
        inventory[first],
      ];
    }
    return result;
  }

  async deleteItem(index: number) {
    const inventory = this.character.inventory;

    if (index < 0 || index >= inventory.length) {
      return { ok: false, reason: "Array index out of range" };
    }

    if (inventory[index] == null) {
      return { ok: false, reason: "Target item not found" };
    }

    const result = await this.#characterModel.deleteItem(index);
    if (result.ok) {
      inventory[index] = null;
    }
    return result;
  }

  async equipItem(index: number) {
    const inventory = this.character.inventory;
    const equipment = this.character.equipment;

    if (index < 0 || index >= inventory.length) {
      return { ok: false, reason: "Array index out of range" };
    }

    const inventoryItem = inventory[index];
    if (inventoryItem == null) {
      return { ok: false, reason: "Target item not found" };
    }

    let equipmentSlot: EquipmentSlot = inventoryItem.slot;

    let equippedItem;
    if (inventoryItem.slot == "ring") {
      // since there are two ring slots: ring_1 and ring_2, one must be chosen
      if (equipment.ring_1 == null) {
        equipmentSlot = "ring_1";
        equippedItem = equipment["ring_1"];
      } else {
        equipmentSlot = "ring_2";
        equippedItem = equipment["ring_2"];
      }
    } else {
      equippedItem = equipment[equipmentSlot];
    }

    const result = await this.#characterModel.equipItem(
      { index, inventoryItem },
      {
        slot: equipmentSlot,
        equippedItem,
      }
    );
    if (result.ok) {
      [inventory[index], equipment[equipmentSlot]] = [
        equipment[equipmentSlot],
        inventory[index],
      ];
    }
    return result;
  }
}

export default CharacterModelProxy;
