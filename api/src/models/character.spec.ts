import { beforeEach, describe, expect, test } from "vitest";
import Mongo from "../mongo.js";
import Character from "./character.js";

Mongo.connect();

const deletedCharactersCollection = Mongo.getClient().db("game").collection("deletedCharacters");

beforeEach(async () => {
  await Character.collection.deleteMany({});
  await deletedCharactersCollection.deleteMany({});
});

describe("create character", async () => {
  test("create a character with a name already in use", async () => {
    const firstQueryResult = await Character.createCharacter(
      "testuser",
      "sorcerer",
      "first character"
    );

    expect(firstQueryResult.ok).toBeTruthy();

    const secondQueryResult = await Character.createCharacter(
      "testuser",
      "ranger",
      "first character"
    );

    expect(secondQueryResult.ok).toBeFalsy();

    const result = await Character.getAllCharactersOverview("testuser");

    if (result.ok) {
      const characters = result.val;
      expect(characters.length).toBe(1);
    }
  });

  test("create a character for different users with unique character names", async () => {
    const firstQueryResult = await Character.createCharacter(
      "firstuser",
      "ranger",
      "first character"
    );

    const secondQueryResult = await Character.createCharacter(
      "seconduser",
      "ranger",
      "second character"
    );

    const thirdQueryResult = await Character.createCharacter(
      "thirduser",
      "ranger",
      "third character"
    );

    const characters = await Character.collection.find({}).toArray();
    expect(characters.length).toBe(3);
  });
});

describe("delete character", async () => {
  test("user can delete only their character", async () => {
    const firstQueryResult = await Character.createCharacter(
      "firstuser",
      "ranger",
      "first character"
    );

    const secondQueryResult = await Character.createCharacter(
      "seconduser",
      "ranger",
      "second character"
    );

    const thirdQueryResult = await Character.createCharacter(
      "seconduser",
      "ranger",
      "third character"
    );

    const deleteWrongCharacter = await Character.deleteCharacter("firstuser", "second character");

    expect(deleteWrongCharacter.ok).toBeFalsy(); // cannot delete character of different user

    let amountOfCharacters = (await Character.collection.find({}).toArray()).length;

    expect(amountOfCharacters).toBe(3);

    const deleteCorrectCharacter = await Character.deleteCharacter("firstuser", "first character");

    expect(deleteCorrectCharacter.ok).toBeTruthy();

    amountOfCharacters = (await Character.collection.find({}).toArray()).length;

    expect(amountOfCharacters).toBe(2);
  });
});

describe("move deleted character to deletedCharacters collection", async () => {
  test("1", async () => {
    await Character.createCharacter("testuser", "ranger", "first character");

    const deleteQueryResult = await Character.deleteCharacter("testuser", "first character");
    expect(deleteQueryResult.ok).toBeTruthy();

    const deletedCharacters = await deletedCharactersCollection.find({}).toArray();

    expect(deletedCharacters.length).toBe(1);
  });
});
