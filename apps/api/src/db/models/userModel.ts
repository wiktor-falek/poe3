import bcrypt from "bcrypt";
import { DatabasePool, SlonikError, sql } from "slonik";
import { Ok, Err } from "resultat";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import { pool, testingPool } from "../postgres.js";
import { decode, encode } from "../../utils/token.js";
import { sendEmail } from "../../utils/email.js";
import { User } from "../../../../common/types/user.js";

/*
CREATE TABLE users ( 
  id SERIAL PRIMARY KEY,
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
  hasConfirmedEmail: z.boolean(),
  hash: z.string(),
  registrationTimestamp: z.number(),
  sessionId: z.string(),
  characterLimit: z.number(),
});

const usernameObject = z.object({
  username: z.string(),
});

class UserModel {
  prod: boolean;
  pool: DatabasePool;

  /**
   * By default connect to testing database,
   * opt into production database by passing { prod: true }
   */
  constructor(options: { prod: boolean } = { prod: false }) {
    this.prod = options.prod;
    this.pool = options.prod ? pool : testingPool;
  }

  findByUsername(username: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`
            SELECT * FROM users WHERE username = ${username}
          `
        );

        return result as User;
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "NotFoundError") {
            return undefined;
          } else {
            console.error(error.name, error.message);
          }
        } else {
          throw error;
        }
      }
    });
  }

  findByEmail(email: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`
            SELECT * FROM users WHERE email = ${email}
          `
        );

        return result as User;
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "NotFoundError") {
            return undefined;
          } else {
            console.error(error.name, error.message);
          }
        } else {
          throw error;
        }
      }
    });
  }

  findBySessionId(sessionId: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(userObject)`
            SELECT * FROM users WHERE session_id = ${sessionId}
          `
        );

        return result as User;
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "NotFoundError") {
            return undefined;
          } else {
            console.error(error.name, error.message);
          }
        } else {
          throw error;
        }
      }
    });
  }

  emailIsInUse(email: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(usernameObject)`
            SELECT username FROM users 
            WHERE email = ${email} AND has_confirmed_email = TRUE
          `
        );
        return Ok(result);
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "NotFoundError") {
            return Ok({ username: null });
          }
        } else {
          throw error;
        }
      }
      return Err("Read fail");
    });
  }

  async register(username: string, password: string, email: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.query(
          sql.type(userObject)`
            INSERT INTO users (username, email, hash, registration_timestamp) 
            VALUES (${username}, ${email}, ${hash}, ${Date.now()})
            RETURNING *
          `
        );
        return Ok(result.rows[0]);
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "UniqueIntegrityConstraintViolationError") {
            return Err("Username is already taken");
          }
        } else {
          throw error;
        }
      }
      return Err("Failed to create user");
    });
  }

  async login(username: string, password: string) {
    const user = await this.findByUsername(username);

    if (!user) {
      return Err("Incorrect username or password");
    }

    const isAuthenticated = await bcrypt.compare(password, user.hash);

    if (!isAuthenticated) {
      return Err("Incorrect username or password");
    }

    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(
            z.object({
              sessionId: z.string(),
            })
          )`
            UPDATE users SET session_id = ${uuidv4()} 
            WHERE username = ${username} 
            RETURNING session_id
          `
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

    return this.pool.connect(async (connection) => {
      try {
        const returnType = z.object({
          username: z.string(),
          verified: z.boolean(),
        });
        const result = await connection.one(
          sql.type(returnType)`
            UPDATE users SET has_confirmed_email = TRUE 
            WHERE username = ${username} 
            AND email = ${email} 
            AND has_confirmed_email = FALSE
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
  }

  async recoverPassword(email: string) {
    const user = await this.findByEmail(email);
    if (!user?.hasConfirmedEmail) {
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

    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(returnType)`
            UPDATE users SET "hash" = ${hash} 
            RETURNING "hash"
            `
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
  }

  async deleteUser(name: string) {
    return Err("Not Implemented");
  }
}

export default UserModel;
