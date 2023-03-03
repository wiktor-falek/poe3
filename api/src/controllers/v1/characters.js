import { Router } from "express";
import { body, param, validationResult } from "express-validator";
import { ObjectId } from "mongodb";

import logger from "../../../logger.js";
import characterSchema from "../../db/schemas/characterSchema.js";
import User from "../../db/models/User.js";

import { startingGear } from "../../globals/playerClasses.js";

const router = Router();

// basic data of all characters
router.get("/characters", async (req, res) => {
  const { user } = res.locals;

  try {
    const basicCharactersData = user.characters.map((character) => ({
      id: character._id,
      name: character.name,
      class: character.class,
      level: character.level.value,
    }));
    res.json(basicCharactersData);
  } catch (e) {
    res.status(204);
  }
});

// full data of a character matching id
router.get(
  "/characters/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = res.locals;

    const characterId = req.params.id;

    if (!ObjectId.isValid(characterId)) {
      return res
        .status(400)
        .json({ error: `'${characterId}' is not valid id` });
    }

    const doc = await User.collection
      .find({ _id: ObjectId(userId) })
      .limit(1)
      .project({ characters: { $elemMatch: { _id: ObjectId(characterId) } } })
      .toArray();

    if (doc === null) {
      logger.emerg(
        "this shouldn't be possible unless this route was not authorized or the query does not find the user by id"
      );
      return res.status(400).json({ error: "character does not exist" });
    }

    let character;
    try {
      character = doc[0].characters[0];
    } catch (e) {
      return res.status(400).json({ error: "character does not exist" });
    }

    res.json(character);
  }
);

// create a new character
router.post(
  "/characters",
  body("name").isString().trim().isLength({ min: 3, max: 24 }),
  body("class").isString().trim().isLength({ min: 3, max: 16 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { userId } = res.locals;

    let character;

    try {
      character = await characterSchema.validateAsync({
        name: req.body.name,
        class: req.body.class,
        level: {},
        equipment: startingGear[req.body.class],
      });
    } catch (e) {
      logger.error(`character validation failed, ${e}`);
      return res.status(400).json({ error: e.details[0].message });
    }

    const user = res.locals.user;

    // check if user won't exceed character limit
    try {
      if (user.characters.length >= user.account.characterLimit) {
        return res.status(400).json({ error: "reached character limit" });
      }

      const existingCharacter = user.characters.find(
        (character) => character.name === req.body.name
      );
      if (existingCharacter) {
        return res.status(400).json({ error: "name is already in use" });
      }
    } catch {}

    // otherwise update
    const newCharacterId = new ObjectId();

    try {
      const result = await User.collection.updateOne(
        { _id: ObjectId(userId) },
        { $push: { characters: { _id: newCharacterId, ...character } } }
      );

      if (result.acknowledged) {
        return res.status(200).json({ _id: newCharacterId, ...character });
      }
    } catch {
      // there is an unique index, another account already created a character with that name
      return res.status(400).json({ error: "name is already in use" });
    }

    res.status(400).json({ error: "character creation failed" });
  }
);

// delete a character
router.delete(
  "/characters/:id",
  param("id").isString().isLength({ min: 24, max: 24 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { userId } = res.locals;

    const characterId = req.params.id;

    if (!ObjectId.isValid(characterId)) {
      return res
        .status(400)
        .json({ error: `'${characterId}' is not valid id` });
    }

    // TODO: move character to 'graveyard' instead of straight up deleting to allow restoring
    const result = await User.collection.updateOne(
      { _id: ObjectId(userId) },
      { $pull: { characters: { _id: ObjectId(characterId) } } }
    );

    if (result.modifiedCount === 0) {
      return res.status(400).json({ error: "character does not exist" });
    }
    res
      .status(200)
      .json({ message: `deleted character with id ${characterId}` });
  }
);

export default router;
