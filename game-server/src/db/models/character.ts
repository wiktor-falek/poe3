import Mongo from "../mongo.js";

class Character {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection("characters");

  static async findByName(name: string) {
    const user = await this.collection.findOne({ name: name });
    return user;
  }
}

export default Character;
