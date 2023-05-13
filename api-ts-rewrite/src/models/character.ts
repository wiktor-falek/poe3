import Joi from "joi";
import { Ok, Err } from "resultat";
import Mongo from "../mongo.js";
import startingGear from "../components/startingGear.js";
import { MongoServerError } from "mongodb";

const characterSchema = Joi.object({
  username: Joi.string().min(6).max(30).required(),
  name: Joi.string().min(3).max(24).required(),
  silver: Joi.number().integer().default(0),
  class: Joi.string().valid("swordsman", "ranger", "sorcerer", "assassin"),
  level: Joi.object({
    value: Joi.number().integer().min(1).max(100).default(1),
    xp: Joi.number().integer().min(0).default(0),
    requiredXp: Joi.number().integer().min(10).default(10),
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

// TODO: share this between all repos
type CharacterClass = "swordsman" | "ranger" | "sorcerer" | "assassin";

class Character {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection("characters");

  static async getCharacterCount(username: string): Promise<number> {
    const characterCount = await this.collection.countDocuments({
      username: username,
    });
    return characterCount;
  }

  static async createCharacter(
    username: string,
    characterClass: CharacterClass,
    characterName: string
  ) {
    const initialCharacterData = {
      username,
      name: characterName,
      class: characterClass,
      equipment: startingGear[characterClass],
    };

    const validationResult = characterSchema.validate(initialCharacterData);

    if (validationResult.error) {
      return Err("Data validation failed");
    }

    const character = validationResult.value;

    const characterCount = await this.getCharacterCount(username);

    // TODO: unhardcore character count
    if (characterCount >= 3) {
      return Err("Reached character limit");
    }

    try {
      const result = await this.collection.insertOne({
        username,
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

    return Ok(`Successfully created character ${characterName}`);
  }

  static async getCharactersOverview(username: string) {
    const characters = this.collection.findOne(
      { username },
      { projection: { _id: 0, characters: 1 } }
    );
  }
}

// Indexes
Character.collection.createIndexes([
  {
    key: { name: 1 },
    unique: true,
  },
]);

export default Character;
export { characterSchema };
