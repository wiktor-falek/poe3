import { Collection, Db, Document, MongoClient } from "mongodb";
import Mongo from "./Mongo.js";

class User {
  collection: Collection;
  constructor(db: Db) {
    this.collection = db.collection("users");
  }
  async findUser(username: String, sessionId: String): Promise<Document | null> {
    const user = this.collection.findOne({
      "account.username": username,
      "account.sessionId": sessionId,
    });
    return user;
  }
  async findCurrentCharacter(): Promise<Document | null> {
    const currentCharacter = this.collection.aggregate([
      {
        $project: {
          result: {
            $filter: {
              input: "$characters",
              as: "character",
              cond: { $eq: ["$activity.currentCharacter", "$$character._id"] },
            },
          },
        },
      },
    ]).toArray()
    .then((doc) => doc[0])

    return currentCharacter;
  }
}

export default new User(Mongo.db);
