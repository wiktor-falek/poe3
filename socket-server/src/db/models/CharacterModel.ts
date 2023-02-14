import { Collection, ObjectId } from "mongodb";
import { Character } from "../../../*";
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

    return result.characters[0];
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

  /**
   * Adds an item to the characters first inventory array index that is null
   */
  async addItem(item: any, character: Character): Promise<any> {
    // TODO: turn all of this into a query

    // find first index in characters inventory that equals null
    const firstEmptyInventoryIndex = character.inventory.indexOf(null);

    if (firstEmptyInventoryIndex === -1) {
      return { ok: false, reason: "Inventory is full" };
    }

    const dbArrayIndex = `characters.$.inventory.${firstEmptyInventoryIndex}`;
    const result = await this.collection.updateOne(
      { ...this.filter },
      {
        $set: { [dbArrayIndex]: item },
      }
    );

    if (result.modifiedCount === 1) {
      return { ok: true, inventoryIndex: firstEmptyInventoryIndex };
    }

    return { ok: false, reason: "Query did not modify" };
  }

  async swapIndices(firstIndex: number, secondIndex: number): Promise<any> {
    return { ok: false };
    return { ok: true, swappedIndices: [0, 1] };
  }
}

export default CharacterModel;
