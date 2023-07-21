import { ObjectId } from "mongodb";
import { Character, EquipmentSlot } from "@poe3/types";
import { Err, Ok } from "resultat";

class CharacterModel {
  constructor() {
    // pool
  }

  async findByName(name: string): Promise<Character | null> {
    return null;
  }

  async addSilver(name: string, amount: number) {
    if (false) {
      return Err("Failed to add silver");
    } else {
      return Ok(69);
    }
  }

  deleteItem(name: string, id: ObjectId) {}

  unequipItem(name: string, equipmentSlot: EquipmentSlot) {}

  equipItem(name: string, inventoryIdx: number, equipmentSlot: EquipmentSlot) {}
}

export default CharacterModel;
