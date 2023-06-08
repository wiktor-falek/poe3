import Joi from "joi";
import { Ok, Err, ResultOk, ResultErr } from "resultat";
import Mongo from "../mongo.js";
import startingGear from "../components/startingGear.js";
import { MongoServerError } from "mongodb";
import type { CharacterOverview } from "../../../common/api-types/index.js";
import type { CharacterClass, StaticCharacter } from "../../../common/types/index.js";

const characterSchema = Joi.object({
  userId: Joi.string().length(24).required(),
  // username: Joi.string().min(6).max(30).required(),
  name: Joi.string().min(3).max(24).required(),
  silver: Joi.number().integer().default(0),
  class: Joi.string().valid("swordsman", "ranger", "sorcerer", "assassin"),
  level: Joi.object().default({
    value: 1,
    xp: 0,
    requiredXp: 10,
  }),
  equipment: Joi.object().default({
    hand: null,
    offhand: null,
    helmet: null,
    chest: null,
    gloves: null,
    boots: null,
    ring_1: null,
    ring_2: null,
    amulet: null,
    belt: null,
  }),
  inventory: Joi.array().default(new Array(32).fill(null)),
  progression: Joi.object().default({
    mainStory: {
      highestZoneId: 0,
    },
  }),
});

class Character {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection("characters");

  static async getCharacterCount(userId: string): Promise<number> {
    const characterCount = await this.collection.countDocuments({
      userId,
    });
    return characterCount;
  }

  static async createCharacter(
    userId: string,
    characterClass: CharacterClass,
    characterName: string
  ): Promise<ResultOk<CharacterOverview> | ResultErr> {
    const initialCharacterData = {
      userId,
      name: characterName,
      class: characterClass,
      equipment: startingGear[characterClass],
    };

    const validationResult = characterSchema.validate(initialCharacterData);

    if (validationResult.error) {
      return Err("Data validation failed");
    }

    const character = validationResult.value;

    const characterCount = await this.getCharacterCount(userId);

    const CHARACTER_LIMIT = 12; // TODO: unhardcore character count
    if (characterCount >= CHARACTER_LIMIT) {
      return Err("Reached character limit");
    }

    try {
      const result = await this.collection.insertOne({
        userId,
        ...character,
      });

      if (result.insertedId === null) {
        return Err("Database write failed");
      }
    } catch (err) {
      const error = err as MongoServerError;
      if (error.code === 11000) {
        return Err("Character name is already taken");
      }
      return Err("Failed to create the character");
    }

    const characterOverview: CharacterOverview = {
      name: character.name,
      class: character.class,
      level: character.level.value,
    };

    return Ok(characterOverview);
  }

  static async getCharacter(userId: string, characterName: string) {
    const character = await this.collection.findOne(
      {
        userId,
        name: characterName,
      },
      { projection: { _id: 0, userId: 0 } }
    );

    if (character === null) {
      return Err("Character not found");
    }

    // TODO: ask a typescript wizard how to avoid this cringe
    return Ok(character as unknown as StaticCharacter);
  }

  // OPTIMIZE: move this to user collection, where the subset data of each character
  // will be stored in the characters field for fast access
  static async getAllCharactersOverview(userId: string) {
    try {
      const cursor = this.collection.find({ userId }, { projection: { _id: 0, userId: 0 } });

      const characters = await cursor.toArray();

      const charactersOverview: Array<CharacterOverview> = characters.map(c => {
        return {
          name: c.name,
          class: c.class,
          level: c.level.value,
        };
      });

      return Ok(charactersOverview);
    } catch {
      return Err("Database read failed");
    }
  }

  static async deleteCharacter(userId: string, characterName: string) {
    const character = await this.collection.findOne({
      userId,
      name: characterName,
    });

    if (character === null) {
      return Err("Character does not exist");
    }

    // insert the character to deletedCharacters collection
    const inserted = await this.db.collection("deletedCharacters").insertOne(character);

    if (inserted.insertedId === null) {
      return Err("Failed to insert the character");
    }

    // delete the character from characters collection after inserting
    const deleted = await this.collection.deleteOne({
      userId,
      name: characterName,
    });

    if (deleted.deletedCount !== 1) {
      return Err("Failed to delete the character");
    }

    return Ok(1);
  }
}

// Indexes
Character.collection.createIndexes([
  { key: { userId: 1 } },
  {
    key: { name: 1 },
    unique: true,
  },
]);

export default Character;
export { characterSchema };
