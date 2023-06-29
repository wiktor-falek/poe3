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
    // find item where equipment equals ${equipmentSlot}, unset equipment and set inventory
    // to first available inventory index: starting at 1, ending at INVENTORY_LIMIT (inclusive)

    const INVENTORY_LIMIT = 35; // inclusive

    const result = this.collection.updateOne(
      {
        name: "apdo",
        $expr: {
          $lt: [
            {
              $size: {
                $filter: {
                  input: "$items",
                  as: "item",
                  cond: { $ne: ["$$item.inventory", undefined] },
                },
              },
            },
            INVENTORY_LIMIT + 1,
          ],
        },
      },
      [
        {
          $set: {
            items: {
              $map: {
                input: "$items",
                as: "item",
                in: {
                  $cond: [
                    {
                      $and: [
                        { $eq: ["$$item.equipment", equipmentSlot] },
                        { $ne: ["$$item.inventory", undefined] },
                      ],
                    },
                    {
                      name: "$$item.name",
                      inventory: {
                        $let: {
                          vars: {
                            range: { $range: [1, INVENTORY_LIMIT + 1] },
                            existingInventory: "$items.inventory",
                          },
                          in: {
                            $arrayElemAt: [
                              {
                                $setDifference: ["$$range", "$$existingInventory"],
                              },
                              0,
                            ],
                          },
                        },
                      },
                    },
                    "$$item",
                  ],
                },
              },
            },
          },
        },
      ]
    );
    console.log({ result });
  }

  static async equipItem(name: string, inventoryIdx: number, equipmentSlot: EquipmentSlot) {
    // find item where inventory equals ${inventoryIdx}, unset inventory field and set equipment to ${equipmentSlot}
    // if there is an item with equipment: ${equipmentSlot} already, do the reverse
    const result = this.collection.bulkWrite([
      {
        updateOne: {
          filter: {
            name,
            $or: [{ "items.inventory": inventoryIdx }, { "items.equipment": equipmentSlot }],
          },
          update: {
            $set: {
              "items.$[inventoryItem].equipment": equipmentSlot,
              "items.$[equippedItem].inventory": inventoryIdx,
            },
            $unset: {
              "items.$[inventoryItem].inventory": "",
              "items.$[equippedItem].equipment": "",
            },
          },
          arrayFilters: [
            { "inventoryItem.inventory": inventoryIdx },
            { "equippedItem.equipment": equipmentSlot },
          ],
          upsert: true,
        },
      },
    ]);
    console.log({ result });
  }
}

export default Character;
