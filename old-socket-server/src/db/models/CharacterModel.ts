import { Collection, ObjectId } from "mongodb";
import { Character, EquipmentSlot, Level } from "../../../*";
import Mongo from "../Mongo";

// TODO: make ResultSuccess and ResultError maybe? perhaps? idk

interface Result {
  ok: boolean;
  reason?: string; // if not ok
  data?: object; // if ok
}
// TODO: return Promise<Result> for all the methods

class CharacterModel {
  collection: Collection;
  username: string;
  characterId: ObjectId;
  filter: object;
  projection: object;

  constructor(username: string, sessionId: string, characterId: string) {
    this.username = username;
    this.characterId = new ObjectId(characterId);
    this.collection = Mongo.db.collection("users");
    this.filter = {
      "account.username": username,
      "account.sessionId": sessionId,
      characters: {
        $elemMatch: { _id: this.characterId },
      },
    };
    this.projection = {
      projection: {
        characters: {
          $elemMatch: { _id: this.characterId },
        },
      },
    };
  }

  // queries the database and returns the whole character object
  async getCharacterData(): Promise<Character | null> {
    const result = await this.collection.findOne(
      { ...this.filter },
      this.projection
    );
    if (result === null) return null;

    return result.characters[0];
  }

  async awardSilver(silverAmount: number): Promise<boolean> {
    const result = await this.collection.updateOne(
      { ...this.filter },
      { $inc: { "characters.$.silver": silverAmount } }
    );
    if (result.acknowledged && result.modifiedCount === 1) {
      return true;
    }
    return false;
  }

  async awardXp(level: Level): Promise<boolean> {
    const result = await this.collection.updateOne(
      { ...this.filter },
      { $set: { "characters.$.level": level } }
    );
    if (result.acknowledged && result.modifiedCount === 1) {
      return true;
    }
    return false;
  }

  /**
   * Adds an item to the characters first inventory array index that is null
   */
  async addItem(item: any, character: Character): Promise<any> {
    // TODO: turn all of this into a query

    // find first index in characters inventory that equals null
    const firstEmptyInventoryIndex = character.inventory.indexOf(null);

    if (firstEmptyInventoryIndex === -1) {
      return { ok: false, reason: "Inventory is full" };
    }

    const dbArrayIndex = `characters.$.inventory.${firstEmptyInventoryIndex}`;
    const result = await this.collection.updateOne(
      { ...this.filter },
      {
        $set: { [dbArrayIndex]: item },
      }
    );

    if (result.modifiedCount === 1) {
      return { ok: true, inventoryIndex: firstEmptyInventoryIndex };
    }

    return { ok: false, reason: "Query did not modify" };
  }

  async swapInventoryIncides(
    first: { index: number; item: any },
    second: { index: number; item: any }
  ): Promise<any> {
    const result = await this.collection.updateOne(
      { ...this.filter },
      {
        $set: {
          [`characters.$.inventory.${first.index}`]: second.item,
          [`characters.$.inventory.${second.index}`]: first.item,
        },
      }
    );

    if (result.modifiedCount === 1) {
      return { ok: true, swappedIndices: [first.index, second.index] };
    }

    return { ok: false };
  }

  async deleteItem(index: number): Promise<Result> {
    const result = await this.collection.updateOne(
      { ...this.filter },
      {
        $set: {
          [`characters.$.inventory.${index}`]: undefined,
        },
      }
    );
    if (result.modifiedCount === 1) {
      return { ok: true, data: { item: null } };
    }
    return { ok: false, reason: "Failed to delete item" };
  }

  async equipItem(
    itemToEquip: { index: number; inventoryItem: any },
    targetEquipmentSlot: { slot: EquipmentSlot; equippedItem: any }
  ): Promise<Result> {
    const { index, inventoryItem } = itemToEquip;
    const { slot, equippedItem } = targetEquipmentSlot;

    const result = await this.collection.updateOne(
      { ...this.filter },
      {
        $set: {
          [`characters.$.equipment.${slot}`]: inventoryItem,
          [`characters.$.inventory.${index}`]: equippedItem,
        },
      }
    );

    if (result.modifiedCount === 1) {
      return { ok: true, data: { index, slot } };
    }
    return {
      ok: false,
      reason:
        "Failed to equip the item (items were identical, will have unique id in the future)",
    };
  }

  async unequipItem(
    equipmentSlot: { slot: EquipmentSlot; item: any },
    inventorySlot: { index: number; value: null }
  ) {
    const { slot, item } = equipmentSlot;
    const { index, value } = inventorySlot;
    const result = await this.collection.updateOne(
      { ...this.filter },
      {
        $set: {
          [`characters.$.equipment.${slot}`]: value,
          [`characters.$.inventory.${index}`]: item,
        },
      }
    );
    if (result.modifiedCount === 1) {
      return { ok: true, data: { slot, index } };
    }
    return { ok: false, reason: "Failed to unequip item" };
  }
}

export default CharacterModel;
