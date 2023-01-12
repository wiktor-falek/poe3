import type { Collection, Document } from "mongodb";
import type { Character } from "../../../*";
import Mongo from "../Mongo";

class User {
  collection: Collection;
  constructor() {
    this.collection = Mongo.db.collection("users");
  }

  findUser(username: String, sessionId: String): Promise<Document | null> {
    const user = this.collection.findOne({
      "account.username": username,
      "account.sessionId": sessionId,
    });
    return user;
  }

  async findCurrentCharacter(): Promise<Character|null> {
    const currentCharacter = await this.collection.aggregate([
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

    return currentCharacter[0].result[0];
  }
}

export default new User();