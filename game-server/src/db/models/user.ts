import Mongo from "../mongo.js";

class User {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection("users");

  static async findBySessionId(sessionId: string) {
    const user = await this.collection.findOne(
      { "account.sessionId": sessionId }
      // {projection: {}}
    );
    return user;
  }
}

export default User;
