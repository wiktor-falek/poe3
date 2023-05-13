import Joi from "joi";
import { Ok, Err } from "resultat";
import Mongo from "../mongo.js";
import startingGear from "../components/startingGear.js";
import { ObjectId } from "mongodb";

const characterSchema = Joi.object({
  silver: Joi.number().integer().default(0),
  name: Joi.string().min(3).max(24).required(),
  class: Joi.string().valid("swordsman", "ranger", "sorcerer", "assassin"),
  level: Joi.object({
    value: Joi.number().integer().min(1).max(100).default(1),
    xp: Joi.number().integer().min(0).default(0),
    requiredXp: Joi.number().integer().min(10).default(10),
  }),
  resources: Joi.object({
    hp: Joi.number().integer().min(0).default(Joi.ref("maxHp")),
    maxHp: Joi.number().integer().min(0).default(20),
    mp: Joi.number().integer().min(0).default(Joi.ref("maxMp")),
    maxMp: Joi.number().integer().min(0).default(10),
  }),
  attributes: Joi.object({
    strength: Joi.number().integer(),
    dexterity: Joi.number().integer(),
    intelligence: Joi.number().integer(),
    vitality: Joi.number().integer(),
    speed: Joi.number().integer(),
  }).required(),
  resistances: Joi.object({
    fire: Joi.number().integer(),
    cold: Joi.number().integer(),
    lightning: Joi.number().integer(),
    physical: Joi.number().integer(),
    poison: Joi.number().integer(),
    necrotic: Joi.number().integer(),
  }).default({
    fire: 0,
    cold: 0,
    lightning: 0,
    physical: 0,
    poison: 0,
    necrotic: 0,
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

  static async createCharacter(
    username: string,
    characterClass: CharacterClass,
    characterName: string
  ) {
    const character = {
      name: characterName,
      class: characterClass,
      equipment: startingGear[characterClass],
    };

    // TODO: make a transaction that checks if:
    // "account.characterLimit" is not exceeded
    // characterName is not in "characters"
    // https://www.mongodb.com/docs/manual/core/transactions/

    const result = await this.collection.updateOne(
      { "account.username": username },
      { $push: { characters: { _id: new ObjectId(), character } } }
    );

    if (result.upsertedCount === 0) {
      return Err("Failed to create a new character");
    }

    return Ok(character)
  }

  static async getCharactersOverview(username: string) {
    const characters = this.collection.findOne(
      { "account.username": username },
      { projection: { _id: 0, characters: 1 } }
    );
  }
}

export default Character;
export { characterSchema };
