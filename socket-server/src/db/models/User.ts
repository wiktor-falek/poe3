import { Collection, Document } from "mongodb";
import Mongo from "../Mongo";

class User {
  collection: Collection;
  constructor() {
    this.collection = Mongo.db.collection("users");
  }

  findUser(username: string, sessionId: string): Promise<Document | null> {
    const user = this.collection.findOne({
      "account.username": username,
      "account.sessionId": sessionId,
    });
    return user;
  }
}

export default new User();
