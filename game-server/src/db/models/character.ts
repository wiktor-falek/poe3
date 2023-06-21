import { StaticCharacter } from "../../../../common/index.js";
import Mongo from "../mongo.js";

class Character {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection<StaticCharacter>("characters");

  static async findByName(name: string) {
    const user = await this.collection.findOne({ name });
    return user;
  }

  static async addSilver(name: string, amount: number) {
    const result = await this.collection.updateOne({ name }, { $inc: { silver: amount } });
  }

  static async deleteItem(name: string, id: string) {
    const reuslt = await this.collection.updateOne({ name }, { $set: {  } });
  }
}

export default Character;
