import { ObjectId } from "mongodb";
import { StaticCharacter, EquipmentSlot } from "../../../../common/index.js";
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
    // WAITING FOR HELP: https://www.mongodb.com/community/forums/c/data/6
  }

  static async equipItem(name: string, id: ObjectId) {}
}

export default Character;
