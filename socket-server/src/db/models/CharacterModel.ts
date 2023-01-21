import { Collection, ObjectId } from "mongodb";
import Mongo from "../Mongo";

class CharacterModel {
  collection: Collection;
  username: string;
  characterId: ObjectId;
  filterQuery: object;
  projection: object;

  constructor(username: string, sessionId: string, characterId: string) {
    this.username = username;
    this.characterId = new ObjectId(characterId);
    this.collection = Mongo.db.collection("users");
    this.filterQuery = {
      "account.username": username,
      "account.sessionId": sessionId,
      characters: {
        $elemMatch: { _id: this.characterId },
      },
    };
    this.projection = {
      projection: {
        characters: {
          $elemMatch: { _id: this.characterId },
        },
      },
    };
  }

  // queries the database and returns the whole character object
  async data() {
    const result = await this.collection.findOne(
      this.filterQuery,
      this.projection
    );
    if (result === null) return null;
    const { _id, ...character } = result.characters[0];
    return character;
  }

  addSilver(silverAmount: number) {
    return this.collection.findOneAndUpdate(
      { ...this.filterQuery },
      { $inc: { "characters.$.silver": silverAmount } }
    );
  }
}

export default CharacterModel;
