import { Request, Response } from "express";
import CharacterModel from "../db/models/characterModel.js";
import Joi from "joi";
import { CharacterClass } from "@poe3/types";

const Character = new CharacterModel();

async function createCharacter(req: Request, res: Response) {
  const VALID_CLASSES: CharacterClass[] = [
    "swordsman",
    "ranger",
    "sorcerer",
    "assassin",
  ];
  const BLACKLISTED_NAMES = ["SERVER", "ERROR", "SYSTEM"];

  const schema = Joi.object<{ name: string; class: CharacterClass }>().keys({
    name: Joi.string()
      .required()
      .invalid(...BLACKLISTED_NAMES)
      .min(3)
      .max(24),
    class: Joi.string()
      .required()
      .valid(...VALID_CLASSES),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const characterName = validationResult.value.name;
  const characterClass = validationResult.value.class;

  if (BLACKLISTED_NAMES.includes(characterName)) {
    return res
      .status(400)
      .json({ error: "This username is not allowed, try something else" });
  }

  const { username } = res.locals.user;

  // username: string,
  // characterName: string,
  // characterClass: CharacterClass
  const result = await Character.createCharacter(
    username,
    characterName,
    characterClass as CharacterClass
  );

  if (!result.ok) {
    return res.status(403).json({ error: result.err });
  }

  const characterOverview = result.val;

  return res.status(200).json(characterOverview);
}

async function getCharacter(req: Request, res: Response) {
  const { username } = res.locals.user;
  const { name } = req.params;

  const schema = Joi.string().required().min(3).max(24);

  const validationResult = schema.validate(name);

  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const character = await Character.findCharacter(username, name);

  if (!character) {
    return res.status(404).json({ error: "Character does not exist" });
  }

  return res.status(200).json(character);
}

async function getAllCharactersOverview(req: Request, res: Response) {
  const { username } = res.locals.user;

  const result = await Character.getAllCharactersOverview(username);

  if (!result.ok) {
    return res.status(500).json({ error: result.err });
  }

  const characters = result.val;

  return res.status(200).json(characters);
}

async function deleteCharacter(req: Request, res: Response) {
  const { username } = res.locals.user;
  const characterName = req.params.name;

  const schema = Joi.string().required().min(3).max(24);

  const validationResult = schema.validate(characterName);

  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const result = await Character.deleteCharacter(username, characterName);
  if (!result.ok) {
    return res.status(500).json({ error: result.err });
  }
  return res.status(200).json({ message: "Character deleted" });
}

export {
  createCharacter,
  getCharacter,
  getAllCharactersOverview,
  deleteCharacter,
};
