import { Request, Response } from "express";
import User from "../models/user.js";
import Joi from "joi";
import { sendEmail } from "../utils/email.js";
import { encode } from "../utils/token.js";

async function register(req: Request, res: Response) {
  const schema = Joi.object().keys({
    username: Joi.string().required().trim().min(6).max(30),
    password: Joi.string().required().min(8).max(128),
    email: Joi.string().required().email().min(6).max(254),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(422).json({ error: "Invalid data" });
  }

  const username: string = req.body.username;
  const password: string = req.body.password;
  const email: string = req.body.email;

  const result = await User.register(username, password, email);
  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const token = encode({ username: username, email: email });

  sendEmail(
    email,
    "Please confirm your email address",
    `Hi ${username}, Click here to confirm your email address and activate your account\n` +
      `http://localhost:3000/auth/verify/${token}`
  );

  return res.status(200).json({
    message: `Successfully created an account with username '${username}'`,
  });
}

async function login(req: Request, res: Response) {
  const { username, password } = req.body;

  const schema = Joi.object().keys({
    username: Joi.string().required().trim().min(6).max(30),
    password: Joi.string().required().min(8).max(128),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(422).json({ error: "Invalid data" });
  }

  const result = await User.login(username, password);
  if (!result.ok) {
    return res.status(401).json({ error: result.err });
  }

  const { sessionId } = result.val;

  res.cookie("sessionId", sessionId, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ authenticated: true });
}

async function verify(req: Request, res: Response) {
  const { token } = req.params;

  const result = await User.verify(token);
  if (!result.ok) {
    return res.status(422).json({ error: result.err });
  }

  const verified = result.data;

  return res.status(200).json({ verified });
}

function recover(req: Request, res: Response) {
  const { email } = req.params;

  // SECURITY: no async so there is no difference in response time on success/failure ???
  // to prevent finding emails that are in use
  User.recover(email);

  return res.status(200).json({ message: "Confirmation email sent" });
}

export { register, login, verify, recover };
