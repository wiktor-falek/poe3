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

  async findCurrentCharacter(
    username: string,
    sessionId: string
  ): Promise<any | null> {
    
    const user = await this.collection.findOne(
      {
        "account.username": username,
        "account.sessionId": sessionId,
      },
      { projection: { "activity.currentCharacter": 1 } }
    );
    if (user === null) return null;

    const currentCharacterId = user.activity.currentCharacter;

    const currentCharacter = await this.collection
      .find({ _id: user._id })
      .project({ characters: { $elemMatch: { _id: currentCharacterId } } })
      .toArray();

    if (currentCharacter === null) return null;

    return currentCharacter[0].characters[0];

    // THIS WOULD NEED TO FILTER USER BY _id FIRST TO WORK
    // This is probably the best way to do this, if I can figure out how to filter
    // const currentCharacter = await this.collection
    //   .aggregate([
    //     {
    //       $project: {
    //         result: {
    //           $filter: {
    //             input: "$characters",
    //             as: "character",
    //             cond: {
    //               $eq: ["$activity.currentCharacter", "$$character._id"],
    //             },
    //           },
    //         },
    //       },
    //     },
    //   ])
    //   .toArray();
    // return currentCharacter[0].result[0];
  }
}

export default new User();
