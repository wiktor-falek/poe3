import { Request, Response } from "express";
import Character from "../models/character.js";
import Joi from "joi";
import { UserData } from "../*.js";

async function createCharacter(req: Request, res: Response) {
  const characterClass = req.body.class;
  const name = req.body.name;

  const schema = Joi.object().keys({
    class: Joi.string().required().min(3).max(16),
    name: Joi.string().required().min(3).max(24),
  });

  try {
    await schema.validateAsync(req.body);
  } catch {
    return res.status(422).json({ error: "Invalid data" });
  }

  const username = res.locals.user.account.username;

  const result = Character.createCharacter(username, characterClass, name);
  // router.post(
  // "/characters",
  // body("class").isString().trim().isLength({ min: 3, max: 16 }),
  // body("name").isString().trim().isLength({ min: 3, max: 24 }),

  // Character.createCharacter()
}
