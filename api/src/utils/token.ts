import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = randomBytes(32).toString("hex");

interface Payload {
  username: string;
  email: string;
  iat?: number | undefined;
  exp?: number | undefined;
}

export const encode = (...args: Array<string | object | Buffer>) => {
  const payload = { ...args };
  const token = jwt.sign(payload, secret, { expiresIn: 86400 });
  return token;
};

export const decode = (token: string) => {
  try {
    const decodedToken = jwt.verify(token, secret);
    return decodedToken as Payload;
  } catch {
    return null;
  }
};
