import { ObjectId } from "mongodb";
import { StaticCharacter, EquipmentSlot } from "../../../../common/types/index.js";
import Mongo from "../mongo.js";
import { Err, Ok } from "resultat";

class Character {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection<StaticCharacter>("characters");

  static async findByName(name: string) {
    const user = await this.collection.findOne({ name });
    return user;
  }

  static async addSilver(name: string, amount: number) {
    const result = await this.collection.updateOne({ name }, { $inc: { silver: amount } });
    if (result.modifiedCount === 0) {
      return Err("Failed to award silver");
    }
    return Ok(1);
  }

  static async deleteItem(name: string, id: ObjectId) {
    const result = await this.collection.updateOne(
      { name, "inventory.$._id": id },
      {
        $set: {
          "inventory.$": undefined,
        },
      }
    );

    if (result.modifiedCount === 0) {
      return Err("Failed to delete item");
    }

    return Ok(1);
  }

  static async unequipItem(name: string, equipmentSlot: EquipmentSlot) {
    // unequip item as equipmentSlot if it exists, and there is enough inventory space
    // item gets placed in the first available index of inventory

    const INVENTORY_LIMIT = 35;

    /*
    Character: {
      name: "apdo",
      ...,
      items: [
        { name: "item 1", ..., inventory: 1 },
        { name: "item 2", ..., inventory: 2 },
        { name: "item 3", ..., inventory: 4 },
        { name: "item 4", ..., inventory: 7 },
        { name: "item 5", ..., equipment: "hand" },
        
        // want to unequip this item
        { name: "item 6", ..., equipment: "helmet" }
        
        // after unequipping it will look like this
        { name: "item 6", ..., inventory: 3 } // 1 and 2 are taken, but 3 is the smallest available index
      ]
    }
    */

    const result = await this.collection.updateOne(
      {
        name,
        "items.equipment": equipmentSlot,
        $expr: {
          $lt: [
            { $size: { $filter: { input: "$items", cond: { $isNumber: "$$this.inventory" } } } },
            INVENTORY_LIMIT,
          ],
        },
      },
      {
        // this needs to be first number between 1 and INVENTORY_LIMIT that is not already taken
        // but i don't know this number when the query gets executed
        $set: { "items.$.inventory": 3 },
        $unset: { "items.$.equipment": "" },
      }
    );

    // return result;
  }

  static async equipItem(name: string, inventoryIdx: number, equipmentSlot: EquipmentSlot) {
    // equips an item at inventoryIdx if it exists, and equipmentSlot is not taken
    const result = await this.collection.updateOne(
      { name, "items.inventory": inventoryIdx, "items.equipment": { $ne: equipmentSlot } },
      {
        $set: { "items.$.equipment": equipmentSlot },
        $unset: { "items.$.inventory": "" },
      }
    );

    if (result.matchedCount === 0) {
      return Err("The equipment slot is already taken");
    }
    if (result.modifiedCount !== 1) {
      return Err("Failed to equip the item");
    }

    return Ok(1);
  }
}

export default Character;
