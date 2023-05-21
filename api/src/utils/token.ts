import { randomBytes } from "node:crypto";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export interface Payload {
  username: string;
  email: string;
  iat: number;
  exp: number;
}

// load secret if possible to allow decoding tokens after server restart
const secret = process.env.JWT_SECRET ?? randomBytes(32).toString("hex");

export const encode = (payload: Object) => {
  const token = jwt.sign(payload, secret, { expiresIn: 86400 });

  return token;
};

export const decode = (token: string): Payload => {
  const payload = jwt.verify(token, secret);
  return payload as Payload;
};
