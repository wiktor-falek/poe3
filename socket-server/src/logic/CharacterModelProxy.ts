import type { Character, EquipmentSlot, Level } from "../../*";
import {
  LEVEL_CAP,
  XP_REQUIREMENT_TABLE,
} from "../constants/xpRequirementTable";
import CharacterModel from "../db/models/CharacterModel";
// TODO: use Result from CharacterModel and add Promise<Result> as return type of each method
interface Result {
  ok: boolean;
  value?: any;
  reason?: string;
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

  async awardSilver(amount: number): Promise<Result> {
    const success = await this.#characterModel.awardSilver(amount);
    if (success) {
      // mutate
      this.character.silver += amount;
      return { ok: true, value: this.character.silver };
    }
    return { ok: false };
  }

  async awardXp(amount: number): Promise<Result> {
    if (this.character.level.value == LEVEL_CAP) {
      return { ok: true };
    }

    const level: Level = Object.assign(this.character.level);

    level.xp += amount;

    while (level.xp >= XP_REQUIREMENT_TABLE[level.value]) {
      level.xp -= level.requiredXp;
      level.value++;
      // TODO: recalculate character properties like resources
      // set hp to maxHp and mp to maxMp, and emit
      level.requiredXp = XP_REQUIREMENT_TABLE[level.value];
    }

    if (level.value == LEVEL_CAP) {
      level.xp = 0;
      level.requiredXp = 0;
    }

    const success = await this.#characterModel.awardXp(level);
    if (success) {
      // mutate
      this.character.level = level;

      return { ok: true, value: { level, xpGained: amount } };
    }
    return { ok: false, reason: "Failed to award xp" };
  }

  async addItem(item: any) {
    const result = await this.#characterModel.addItem(item, this.character);
    if (result.ok) {
      // mutate
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
      // mutate
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
      // mutate
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

    console.log(inventoryItem.requirements);
    if (inventoryItem.requirements.level) {
      if (inventoryItem.requirements.level > this.character.level.value) {
        return { ok: false, reason: "Level requirement not met" };
      }
    } else {
      // property does not exist, meaning there is no level requirement, continue
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
      // mutate
      [inventory[index], equipment[equipmentSlot]] = [
        equipment[equipmentSlot],
        inventory[index],
      ];
    }
    return result;
  }

  async unequipItem(equipmentSlot: EquipmentSlot): Promise<any> {
    const { inventory, equipment } = this.character;

    const equipmentItem = equipment[equipmentSlot];
    if (equipmentItem == null) {
      return { ok: false, reason: "Target item not found" };
    }

    // find first empty inventory slot
    const firstEmptyInventorySlotIdx = inventory.indexOf(null);

    if (firstEmptyInventorySlotIdx === -1) {
      return { ok: false, reason: "Inventory is full" };
    }

    const inventoryItem = inventory[firstEmptyInventorySlotIdx];

    const result = await this.#characterModel.unequipItem(
      { slot: equipmentSlot, item: equipmentItem },
      { index: firstEmptyInventorySlotIdx, value: inventoryItem }
    );
    if (result.ok) {
      // mutate
      [inventory[firstEmptyInventorySlotIdx], equipment[equipmentSlot]] = [
        equipment[equipmentSlot],
        inventory[firstEmptyInventorySlotIdx],
      ];
    }
    return result;
  }
}

export default CharacterModelProxy;
