import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = randomBytes(32).toString("hex");

export const encode = (username: string, email: string) => {
  const payload = { username, email };
  const token = jwt.sign(payload, secret, { expiresIn: 86400 });
  return token;
};

export const decode = (token: string) => {
  const decodedToken = jwt.verify(token, secret);
  return decodedToken;
};
