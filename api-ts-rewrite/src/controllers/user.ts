import { Request, Response } from "express";
import User from "../models/user";
import Joi from "joi";

async function register(req: Request, res: Response) {
  const { username, password, email } = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().trim().required().min(6).max(30),
    password: Joi.string().required().min(8).max(128),
    email: Joi.string().email().min(6).max(254),
  });

  try {
    await schema.validateAsync(req.body);
  } catch {
    return res.status(422).json({ error: "Invalid data" });
  }

  const result = await User.register(username, password, email);
  if (!result.ok) {
    return res.status(400).json({ error: result.error });
  }

  res.status(200).json({
    message: `Successfully created an account with username '${username}'`,
  });
}

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().trim().required().min(6).max(30),
    password: Joi.string().required().min(8).max(128),
  });

  try {
    await schema.validateAsync(req.body);
  } catch {
    return res.status(422).json({ error: "Invalid data" });
  }

  // return res.status(501);
  const result = await User.login(username, password);
  if (!result.ok) {
    return res.status(401).json(result.error)
  }
}

async function verify(req: Request, res: Response) {
  console.log(req.body);
  return res.status(501);
  // User.verify()
}

export { register, login };
