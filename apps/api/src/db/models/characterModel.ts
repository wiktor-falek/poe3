import { DatabasePool, SlonikError, sql } from "slonik";
import { Ok, Err } from "resultat";
import { z } from "zod";
import pool, { testingPool } from "../postgres.js";
import type { CharacterClass, CharacterOverview, Character } from "types/character.js";

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
  testEnv: boolean;
  pool: DatabasePool;

  constructor(testEnv: boolean = false) {
    this.testEnv = testEnv;
    this.pool = testEnv ? pool : testingPool;
  }

  async createCharacter(userId: string, characterName: string, characterClass: CharacterClass) {
    const result = await this.getCharacterCount(userId);
    if (!result.ok) {
      return Err("Something went wrong");
    }

    const CHARACTER_LIMIT = 12; // TODO: read from user instead
    const characterCount = result.val.count;
    if (characterCount >= CHARACTER_LIMIT) {
      return Err("Character limit reached");
    }

    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.query(
          sql.type(characterOverviewObject)`
            INSERT INTO characters (user_id, name, class) 
            VALUES (${userId}, ${characterName}, ${characterClass}) 
            RETURNING name, class, level
          `
        );
        return Ok(result.rows[0] as CharacterOverview);
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

  findCharacter(userId: string, characterName: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.one(
          sql.type(characterObject)`
            SELECT * FROM characters
            WHERE user_id = ${userId} AND name = ${characterName}
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

  async getCharacterCount(userId: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.query(
          sql.type(
            z.object({
              count: z.number(),
            })
          )`
            SELECT COUNT(*) FROM characters
            WHERE user_id = ${userId}
          `
        );
        return Ok(result.rows[0]);
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

  getAllCharactersOverview(userId: string) {
    return this.pool.connect(async (connection) => {
      try {
        const result = await connection.many(
          sql.type(characterOverviewObject)`
            SELECT name, class, level FROM characters
            WHERE user_id = ${userId}
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

  deleteCharacter(userId: string, characterName: string) {
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
            WHERE user_id = ${userId} AND name = ${characterName}
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
