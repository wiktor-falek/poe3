import { Collection, ObjectId } from "mongodb";
import logger from "../../logger";
import Mongo from "../Mongo";

class CharacterModel {
  collection: Collection;
  username: string;
  characterId: ObjectId;
  filter: object;
  projection: object;

  constructor(username: string, sessionId: string, characterId: string) {
    this.username = username;
    this.characterId = new ObjectId(characterId);
    this.collection = Mongo.db.collection("users");
    this.filter = {
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
      { ...this.filter },
      this.projection
    );
    if (result === null) return null;
    const { _id, ...character } = result.characters[0];
    return character;
  }

  async addSilver(silverAmount: number): Promise<boolean> {
    const result = await this.collection.updateOne(
      { ...this.filter },
      { $inc: { "characters.$.silver": silverAmount } }
    );
    if (result.acknowledged && result.modifiedCount === 1) {
      return true;
    }
    return false;
  }
}

export default CharacterModel;
