import { DatabasePool, SlonikError, sql } from "slonik";
import { Ok, Err } from "resultat";
import { z } from "zod";
import { pool } from "../postgres.js";
import type { Character } from "@poe3/types";

/*
CREATE TABLE characters (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  name VARCHAR(24) NOT NULL UNIQUE,
  class VARCHAR(16)  NOT NULL,
  level SMALLINT DEFAULT 1  NOT NULL,
  xp BIGINT DEFAULT 0  NOT NULL,
  req_xp BIGINT DEFAULT 0 NOT NULL,
  silver BIGINT DEFAULT 0 NOT NULL
);
*/

const characterObject = z.object({
  id: z.number(),
  userId: z.number(),
  name: z.string(),
  class: z.string(),
  level: z.number(),
  xp: z.number(),
  reqXp: z.number(),
  silver: z.number(),
});

class CharacterModel {
  pool: DatabasePool;

  constructor() {
    this.pool = pool;
  }

  findCharacterByName(characterName: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(characterObject)`
            SELECT *
            FROM characters
            WHERE name = ${characterName};
          `
        );
        return result as Character;
      } catch (error) {
        if (error instanceof SlonikError) {
          return undefined;
        } else {
          throw error;
        }
      }
    });
  }

  findCharacterByUsernameAndCharacterName(
    username: string,
    characterName: string
  ) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(characterObject)`
            SELECT c.*
            FROM characters c
            JOIN users u ON c.user_id = u.id
            WHERE u.username = ${username} AND c.name = ${characterName};
          `
        );
        return result as Character;
      } catch (error) {
        if (error instanceof SlonikError) {
          return undefined;
        } else {
          throw error;
        }
      }
    });
  }

  grantSilver(characterName: string, amount: number) {
    return this.pool.connect(async (connection) => {
      try {
        const silver = await connection.one(
          sql.type(characterObject)`
            UPDATE characters
            SET silver = silver + ${amount}
            WHERE name = ${characterName}
            RETURNING silver
          `
        );
        return Ok(silver);
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "NotFoundError") {
            return Err("Character does not exist");
          }
          return Err("Something went wrong");
        } else {
          throw error;
        }
      }
    });
  }
}

export default CharacterModel;
