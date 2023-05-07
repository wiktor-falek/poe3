import { Request, Response } from "express";
import User from "../models/user";
import Joi from "joi";
import { sendConfirmationEmail } from "../components/email";
import { encode } from "../utils/token";

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

  const token = encode(username, email);

  sendConfirmationEmail(
    email,
    "Please confirm your email address",
    `Hi ${username}, Click here to confirm your email address and activate your account\n` +
      `http://localhost:3000/auth/verify/${token}`
  );

  console.log(token);

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

  const result = await User.login(username, password);
  if (!result.ok) {
    return res.status(401).json(result.error);
  }

  const sessionId = result.data;

  res.cookie("sessionId", sessionId, {
    httpOnly: false,
    secure: true,
    sameSite: "strict",
  });

  return res.json({ sessionId });
}

async function verify(req: Request, res: Response) {
  const { token } = req.params;
  const result = await User.verify(token);
  if (!result.ok) {
    return res.status(422).json({ error: result.error });
  }

  const verified = result.data;
  
  return res.status(200).json({ verified });
}

export { register, login, verify };
