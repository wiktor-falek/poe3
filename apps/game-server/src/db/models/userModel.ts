import { DatabasePool, SlonikError, sql } from "slonik";
import { z } from "zod";
import { pool } from "../postgres.js";
import { User } from "@poe3/types";

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

class UserModel {
  pool: DatabasePool;

  constructor() {
    this.pool = pool;
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
            console.error(error);
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
            console.error(error);
          }
        } else {
          throw error;
        }
      }
    });
  }
}

export default UserModel;
