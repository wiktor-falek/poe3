import { Request, Response } from "express";
import CharacterModel from "../db/models/characterModel.js";
import Joi from "joi";
import { Character, CharacterOverview } from "types/character.js";
import { z } from "zod";

const Character = new CharacterModel();

async function createCharacter(req: Request, res: Response) {
  const characterClass = req.body.class;
  const name = req.body.name;

  const VALID_CLASSES = ["swordsman", "ranger", "sorcerer", "assassin"];
  const BLACKLISTED_NAMES = ["SERVER", "ERROR", "SYSTEM"];

  const schema = Joi.object().keys({
    class: Joi.string()
      .required()
      .valid(...VALID_CLASSES),
    name: Joi.string()
      .required()
      .invalid(...BLACKLISTED_NAMES)
      .min(3)
      .max(24),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    if (BLACKLISTED_NAMES.includes(name)) {
      return res.status(400).json({ error: "This username is not allowed, try something else" });
    }
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const userName = res.locals.user.username;

  const result = await Character.createCharacter(userName, name, characterClass);

  if (!result.ok) {
    return res.status(403).json({ error: result.err });
  }

  const characterOverview = result.val;

  return res.status(200).json(characterOverview);
}

async function getCharacter(req: Request, res: Response) {
  const userName = res.locals.user.username;
  const { name } = req.params;

  const schema = Joi.string().required().min(3).max(24);

  const validationResult = schema.validate(name);

  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const result = await Character.findCharacter(userName, name);

  if (!result.ok) {
    return res.status(404).json({ error: "Character not found" });
  }

  const character = result.val;

  return res.status(200).json(character);
}

async function getAllCharactersOverview(req: Request, res: Response) {
  const userName = res.locals.user.username;

  const result = await Character.getAllCharactersOverview(userName);

  if (!result.ok) {
    return res.status(500).json({ error: result.err });
  }

  const characters = result.val;

  return res.status(200).json(characters);
}

async function deleteCharacter(req: Request, res: Response) {
  const userName = res.locals.user.username;
  const characterName = req.params.name;

  const schema = Joi.string().required().min(3).max(24);

  const validationResult = schema.validate(characterName);

  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const result = await Character.deleteCharacter(userName, characterName);
  if (!result.ok) {
    return res.status(500).json({ error: result.err });
  }
  return res.status(200).json({ message: `Successfully deleted the character ${characterName}` });
}

export { createCharacter, getCharacter, getAllCharactersOverview, deleteCharacter };
