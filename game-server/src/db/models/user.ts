import Mongo from "../mongo.js";
import type { User as UserDocument } from "../../../../common/index.js";

class User {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection<UserDocument>("users");

  static async findBySessionId(sessionId: string) {
    const user = await this.collection.findOne(
      { "account.sessionId": sessionId }
      // {projection: {}}
    );
    return user;
  }
}

export default User;
