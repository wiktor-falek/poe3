import { DatabasePool, SlonikError, sql } from "slonik";
import { Ok, Err } from "resultat";
import { z } from "zod";
import { pool, testingPool } from "../postgres.js";
import type { CharacterClass, CharacterOverview, Character } from "@poe3/types";

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

const characterOverviewObject = z.object({
  name: z.string(),
  class: z.string(),
  level: z.number(),
});

class CharacterModel {
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

  async createCharacter(
    userName: string,
    characterName: string,
    characterClass: CharacterClass
  ) {
    const result = await this.getCharacterCount(userName);
    if (!result.ok) {
      return Err("Something went wrong");
    }
    const CHARACTER_LIMIT = 12; // TODO: read from user instead
    const characterCount = result.val;
    if (characterCount >= CHARACTER_LIMIT) {
      return Err("Character limit reached");
    }
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(characterOverviewObject)`
            INSERT INTO characters (user_id, name, class)
            SELECT users.id, ${characterName}, ${characterClass}
            FROM users
            WHERE users.username = ${userName}
            RETURNING name, class, level
          `
        );
        return Ok(result as CharacterOverview);
      } catch (error) {
        if (error instanceof SlonikError) {
          if (error.name === "UniqueIntegrityConstraintViolationError") {
            return Err("Character name is already taken");
          } else {
            console.error(error.name, error.message);
            return Err("Failed to create the character");
          }
        } else {
          throw error;
        }
      }
    });
  }

  findCharacter(userName: string, characterName: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(characterObject)`
            SELECT c.*
            FROM characters c
            JOIN users u ON c.user_id = u.id
            WHERE u.username = ${userName} AND c.name = ${characterName};
          `
        );
        return Ok(result as Character);
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

  async getCharacterCount(userName: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(
            z.object({
              count: z.number(),
            })
          )`
            SELECT COUNT(*) AS count
            FROM characters c
            JOIN users u ON c.user_id = u.id
            WHERE u.username = ${userName}
          `
        );
        return Ok(result.count);
      } catch (error) {
        if (error instanceof SlonikError) {
          console.error(error.name, error.message);
          return Err("Read fail");
        } else {
          throw error;
        }
      }
    });
  }

  getAllCharactersOverview(userName: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.many(
          sql.type(characterOverviewObject)`
            SELECT c.name, c.class, c.level
            FROM characters c
            JOIN users u ON c.user_id = u.id
            WHERE u.username = ${userName}
          `
        );
        return Ok(result as CharacterOverview[]);
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

  deleteCharacter(userName: string, characterName: string) {
    // TODO: transaction insert character into deleted_characters, and delete from characters
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(
            z.object({
              deletedCharacterName: z.string(),
            })
          )`
            DELETE FROM characters
            WHERE user_id = (
              SELECT id
              FROM users
              WHERE username = ${userName}
            ) AND name = ${characterName}
            RETURNING name AS deleted_character_name
          `
        );
        return Ok(result);
      } catch (error) {
        if (error instanceof SlonikError) {
          return Err("Character does not exist");
        } else {
          throw error;
        }
      }
    });
  }
}

export default CharacterModel;
