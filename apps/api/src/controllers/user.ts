import { Request, Response } from "express";
import UserModel from "../db/models/user.js";
import Joi from "joi";
import { sendEmail } from "../utils/email.js";
import { encode } from "../utils/token.js";
import dotenv from "dotenv";
dotenv.config();

const User = new UserModel();

async function register(req: Request, res: Response) {
  const schema = Joi.object<{ username: string; password: string; email: string }>().keys({
    username: Joi.string().required().trim().min(6).max(30),
    password: Joi.string().required().min(8).max(128),
    email: Joi.string().required().email().min(6).max(254),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const { username, password, email } = validationResult.value;

  const result = await User.register(username, password, email);
  if (!result.ok) {
    return res.status(400).json({ error: result.err });
  }

  const token = encode({ username: username, email: email });

  if (process.env.NODE_ENV === "production") {
    sendEmail(
      email,
      "Please confirm your email address",
      `Hi ${username}, Click here to confirm your email address and activate your account\n` +
        `http://localhost:3000/auth/verify/${token}`
    );
  } else {
    console.log(`Email confirmation link:\nhttp://localhost:3000/auth/verify/${token}`);
  }

  return res.status(200).json({
    message: `Successfully created an account with username '${username}'`,
  });
}

async function login(req: Request, res: Response) {
  const schema = Joi.object<{ username: string; password: string }>().keys({
    username: Joi.string().required().trim().min(6).max(30),
    password: Joi.string().required().min(8).max(128),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const { username, password } = validationResult.value;

  const result = await User.login(username, password);
  if (!result.ok) {
    return res.status(401).json({ error: result.err });
  }

  const { session_id } = result.val;

  res.cookie("sessionId", session_id, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ username, authenticated: true });
}

async function verify(req: Request, res: Response) {
  const { token } = req.params;

  const result = await User.verify(token);

  const baseUrl = new URL("http://localhost:5173/verified");
  const params = new URLSearchParams(baseUrl.search);

  if (result.ok) {
    const { verified, username } = result.val;
    params.append("verified", verified.toString());
    params.append("username", username);
  } else {
    params.append("error", result.err);
  }

  const url = baseUrl.toString() + "?" + params.toString();

  return res.status(301).redirect(url);
}

async function recoverPassword(req: Request, res: Response) {
  const schema = Joi.string().required().email().min(6).max(254);
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ error: "Invalid email" });
  }

  const email = result.value;

  res.status(200).json({ message: "Confirmation email sent" });

  await User.recoverPassword(email);
}

async function changePassword(req: Request, res: Response) {
  // TODO: validate token and password
  const schema = Joi.object<{ token: string; password: string }>({
    token: Joi.string().required(),
    password: Joi.string().required().min(8).max(128),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ error: "Invalid parameters" });
  }

  const { token, password } = validationResult.value;

  const result = await User.changePassword(token, password);

  if (!result.ok) {
    return res.status(402).json({ error: result.err });
  }

  return res.status(200).json({ message: "Password changed successfully" });
}

export { register, login, verify, recoverPassword, changePassword };
