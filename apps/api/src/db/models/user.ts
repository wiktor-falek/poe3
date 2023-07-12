import bcrypt from "bcrypt";
import { DatabasePool, SlonikError, sql } from "slonik";
import { Ok, Err, ResultErr, ResultOk } from "resultat";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import pool, { testingPool } from "../postgres.js";
import { decode, encode } from "../../utils/token.js";
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

class UserModel {
  pool: DatabasePool;
  constructor(testEnv: boolean = false) {
    this.pool = testEnv ? pool : testingPool;
  }
  async findByUsername(username: string) {
    const result = await this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`SELECT * FROM "user" WHERE username = ${username}`
        );

        return result;
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        } else {
          throw error;
        }
      }
      return null;
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`SELECT * FROM "user" WHERE email = ${email}`
        );

        return result;
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        } else {
          throw error;
        }
      }
      return null;
    });

    return result;
  }

  async findBySessionId(sessionId: string) {
    const result = await this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`SELECT * FROM "user" WHERE session_id = ${sessionId}`
        );

        return result;
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        } else {
          throw error;
        }
      }
      return null;
    });

    return result;
  }

  async emailIsInUse(email: string) {
    const result = await this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(
            z.object({
              username: z.string(),
            })
          )`SELECT username FROM "user" WHERE email = ${email} AND has_confirmed_email = TRUE`
        );
        return Ok(result);
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
          if (error.name === "NotFoundError") {
            return Ok({ username: null });
          }
        } else {
          throw error;
        }
      }
      return Err("Read fail");
    });

    return result;
  }

  async register(username: string, password: string, email: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const result = await this.pool.connect(async (connection) => {
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
      return Err(result.err);
    }
  }

  async login(username: string, password: string) {
    const user = await this.findByUsername(username);

    if (user === null) {
      return Err("Incorrect username or password");
    }

    const isAuthenticated = await bcrypt.compare(password, user.hash);

    if (!isAuthenticated) {
      return Err("Incorrect username or password");
    }

    const result = await this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(
            z.object({
              session_id: z.string(),
            })
          )`UPDATE "user" SET session_id = ${uuidv4()} WHERE username = ${username} RETURNING session_id`
        );
        return Ok(result);
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        } else {
          throw error;
        }
      }
      return Err("Incorrect username or password");
    });

    return result;
  }

  async verify(token: string) {
    const payload = decode(token);
    if (payload === null) {
      return Err("Invalid token");
    }
    const { username, email, iat, exp } = payload;

    const existingUsernameResult = await this.emailIsInUse(email);
    if (!existingUsernameResult.ok) {
      // was unable to read if email is in use
      return Err("Something went wrong");
    }

    const existingUsername = existingUsernameResult.val.username;

    if (existingUsername) {
      if (existingUsername === username) {
        return Err("Your email is already verified");
      }
      return Err("Email is already in use");
    }

    const result = await this.pool.connect(async (connection) => {
      try {
        const returnType = z.object({
          username: z.string(),
          verified: z.boolean(),
        });
        const result = await connection.one(
          sql.type(returnType)`
            UPDATE "user" SET has_confirmed_email = TRUE 
            WHERE username = ${username} AND email = ${email} AND has_confirmed_email = FALSE
            RETURNING username, has_confirmed_email AS verified`
        );
        return Ok(result);
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        } else {
          throw error;
        }
      }
      return Err("Failed to verify");
    });

    return result;
  }

  async recoverPassword(email: string) {
    const user = await this.findByEmail(email);
    if (user === null || !user.has_confirmed_email) {
      return Err("User with this email does not exist");
    }

    const { username } = user;
    const token = encode({ username: username, email: email });
    const url = `http://localhost:5173/recovery/?token=${token}`;

    if (process.env.NODE_ENV === "production") {
      sendEmail(
        email,
        "Account Recovery",
        `Hi ${username}\nClick the link below to change your password.\n${url}\nIf you did not try to recover you account simply ignore this email.`,
        `<h1>Hi ${username}</h1>\n<h2>Click the link below to change your password.</h2>\n<a href="${url}">Reset Password</a>\nIf you did not try to recover you account simply ignore this email.`
      );
    } else {
      console.log(`Account recovery link:\n${url}`);
    }

    return Ok(url);
  }

  async changePassword(token: string, password: string) {
    const payload = decode(token);
    if (payload === null) {
      return Err("Invalid token");
    }
    const { username, email } = payload;
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const returnType = z.object({
      hash: z.string(),
    });

    const result = await this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(returnType)`UPDATE "user" SET "hash" = ${hash} RETURNING "hash"`
        );
        return Ok(result.hash);
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
        } else {
          throw error;
        }
      }
      return Err("Failed to change the password");
    });

    return result;
  }
}

export default UserModel;
