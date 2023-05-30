import Mongo from "../mongo.js";

class Character {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection("characters");

  static async findByName(name: string) {
    const user = await this.collection.findOne(
      { name: name },
      { projection: { _id: 0 } }
    );
    return user;
  }
}

export default Character;
