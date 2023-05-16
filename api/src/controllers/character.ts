import { Request, Response } from "express";
import Character from "../models/character.js";
import Joi from "joi";

async function createCharacter(req: Request, res: Response) {
  const characterClass = req.body.class;
  const name = req.body.name;

  const schema = Joi.object().keys({
    class: Joi.string().required().min(3).max(16),
    name: Joi.string().required().min(3).max(24),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(422).json({ error: "Invalid data" });
  }

  const username = res.locals.user.account.username;

  const result = await Character.createCharacter(
    username,
    characterClass,
    name
  );

  if (!result.ok) {
    return res.status(403).json({ error: result.err });
  }

  const character = result.val;

  return res.status(200).json(character);
}

async function getCharacter(req: Request, res: Response) {
  const username = res.locals.user.account.username;
  const { name } = req.params;

  const schema = Joi.string().required().min(3).max(24);

  const validationResult = schema.validate(name);

  if (validationResult.error) {
    return res.status(422).json({ error: "Invalid data" });
  }

  const result = await Character.getCharacter(username, name);

  if (!result.ok) {
    return res.status(204).json({});
  }

  const character = result.val;

  return res.status(200).json(character);
}

async function getAllCharactersOverview(req: Request, res: Response) {
  const username = res.locals.user.account.username;

  const result = await Character.getAllCharactersOverview(username);

  if (!result.ok) {
    return res.status(500).json({ error: result.err });
  }

  const characters = result.val;

  return res.status(200).json(characters);
}

async function deleteCharacter(req: Request, res: Response) {
  const username = res.locals.user.account.username;
  const characterName = req.params.name;

  const schema = Joi.string().required().min(3).max(24);

  const validationResult = schema.validate(characterName);

  if (validationResult.error) {
    return res.status(422).json({ error: "Invalid data" });
  }

  const result = await Character.deleteCharacter(username, characterName);
  if (!result.ok) {
    return res.status(500).json({ error: result.err });
  }
  return res
    .status(200)
    .json({ message: `Successfully deleted the character ${characterName}` });
}

export {
  createCharacter,
  getCharacter,
  getAllCharactersOverview,
  deleteCharacter,
};
