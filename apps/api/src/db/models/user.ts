import bcrypt from "bcrypt";
import Joi from "joi";
import { v4 as uuidv4 } from "uuid";
import { decode, encode } from "../../utils/token.js";
import { Ok, Err } from "resultat";
import { SlonikError, sql } from "slonik";
import { unknown, z } from "zod";
import pool from "../postgres.js";
import { sendEmail } from "../../utils/email.js";

/*
CREATE TABLE "user" ( 
  ID SERIAL PRIMARY KEY,
  username VARCHAR (32) NOT NULL UNIQUE,
  email VARCHAR (255) NOT NULL,
  has_confirmed_email BOOLEAN DEFAULT FALSE NOT NULL,
  hash VARCHAR (72),
  registration_timestamp BIGINT,
  session_id  VARCHAR (36) UNIQUE,
  character_limit SMALLINT DEFAULT 12
  );
*/

const userObject = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  has_confirmed_email: z.boolean(),
  hash: z.string(),
  registration_timestamp: z.number(),
  session_id: z.string(),
  character_limit: z.number(),
});

class User {
  static async findByUsername(username: string) {
    const result = await pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`SELECT * FROM "user" WHERE username = ${username}`
        );

        return result;
      } catch (error) {
        console.log(error);
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        }
      }
      return null;
    });

    return result;
    // const user = await this.collection.findOne({
    // "account.username": username,
    // });
    //
    // return user;
  }

  static async findByEmail(email: string) {
    // const user = await this.collection.findOne({
    //   "account.email": email,
    //   "account.hasConfirmedEmail": true,
    // });
    // return user;
  }

  static async register(username: string, password: string, email: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await pool.connect(async (connection) => {
      try {
        const result = await connection.query(
          sql.unsafe`INSERT INTO "user" (username, email, hash, registration_timestamp) VALUES (${username}, ${email}, ${hash}, ${Date.now()})`
        );
        if (result.rowCount === 1) {
          return Ok(result.rowCount);
        }
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "UniqueIntegrityConstraintViolationError") {
            return Err("Username is already taken");
          }
        }
      }
      return Err("Failed to create user");
    });

    if (result.ok) {
      return Ok(1);
    } else {
      return result.err;
    }
  }

  static async login(username: string, password: string) {
    // const user = await User.findByUsername(username);
    // if (user === null) {
    //   return Err("Incorrect username or password");
    // }
    // const isAuthenticated = await bcrypt.compare(password, user.account.hash);
    // if (!isAuthenticated) {
    //   return Err("Incorrect username or password");
    // }
    // const sessionId = uuidv4();
    // const result = await this.collection.updateOne(
    //   { "account.username": username },
    //   { $set: { "account.sessionId": sessionId } }
    // );
    // if (result.modifiedCount !== 1) {
    //   return Err("Database write failed");
    // }
    // return Ok({ sessionId });
  }

  static async verify(token: string) {
    // const payload = decode(token);
    // if (payload === null) {
    //   return Err("Invalid token");
    // }
    // const { username, email, iat, exp } = payload;
    // const userWithEmailTaken = await this.collection.findOne(
    //   {
    //     "account.email": email,
    //     "account.hasConfirmedEmail": true,
    //   },
    //   { projection: { "account.username": 1, _id: 0 } }
    // );
    // if (userWithEmailTaken?.account.username === username) {
    //   return Err("Your email is already verified");
    // }
    // if (userWithEmailTaken !== null) {
    //   return Err("Something went wrong");
    // }
    // const result = await this.collection.updateOne(
    //   {
    //     "account.username": username,
    //     "account.email": email,
    //     "account.hasConfirmedEmail": false,
    //   },
    //   { $set: { "account.hasConfirmedEmail": true } }
    // );
    // if (result.modifiedCount === 0) {
    //   return Err("Something went wrong");
    // }
    // return Ok({ username, verified: true });
  }

  static async recoverPassword(email: string) {
    // const user = await User.findByEmail(email);
    // if (user === null) {
    //   return;
    // }
    // const username = user.account.username;
    // const token = encode({ username: username, email: email });
    // const url = `http://localhost:5173/recovery/?token=${token}`;
    // if (process.env.NODE_ENV === "production") {
    //   sendEmail(
    //     email,
    //     "Account Recovery",
    //     `Hi ${username}\nClick the link below to change your password.\n${url}\nIf you did not try to recover you account simply ignore this email.`,
    //     `<h1>Hi ${username}</h1>\n<h2>Click the link below to change your password.</h2>\n<a href="${url}">Reset Password</a>\nIf you did not try to recover you account simply ignore this email.`
    //   );
    // } else {
    //   console.log(`Account recovery link:\n${url}`);
    // }
  }

  static async changePassword(token: string, password: string) {
    // const payload = decode(token);
    // if (payload === null) {
    //   return Err("Invalid token");
    // }
    // const { username, email } = payload;
    // const saltRounds = 10;
    // const salt = await bcrypt.genSalt(saltRounds);
    // const hash = await bcrypt.hash(password, salt);
    // const result = await this.collection.updateOne(
    //   {
    //     "account.username": username,
    //   },
    //   { $set: { "account.hash": hash } }
    // );
    // if (result.modifiedCount === 0) {
    //   return Err("Failed to change the password");
    // }
    // return Ok(1);
  }
}

export default User;
