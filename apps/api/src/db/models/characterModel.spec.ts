import { beforeEach, describe, expect, test } from "vitest";
import CharacterModel from "./characterModel.js";

const Character = new CharacterModel();
// const deletedCharactersCollection = Mongo.getClient().db("game").collection("deletedCharacters");

beforeEach(async () => {
  // await Character.collection.deleteMany({});
  // await deletedCharactersCollection.deleteMany({});
});

describe("create character", async () => {
  test("create a character with a name already in use", async () => {
    const firstQueryResult = await Character.createCharacter(
      "testuser",
      "first character",
      "sorcerer"
    );

    expect(firstQueryResult.ok).toBeTruthy();

    const secondQueryResult = await Character.createCharacter(
      "testuser",
      "first character",
      "ranger"
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
      "first character",
      "ranger"
    );

    const secondQueryResult = await Character.createCharacter(
      "seconduser",
      "second character",
      "ranger"
    );

    const thirdQueryResult = await Character.createCharacter(
      "thirduser",
      "third character",
      "ranger"
    );

    // TODO
    // const characters = await Character.collection.find({}).toArray();
    // expect(characters.length).toBe(3);
  });
});

describe("delete character", async () => {
  test("user can delete only their character", async () => {
    const firstQueryResult = await Character.createCharacter(
      "firstuser",
      "first character",
      "ranger"
    );

    const secondQueryResult = await Character.createCharacter(
      "seconduser",
      "second character",
      "ranger"
    );

    const thirdQueryResult = await Character.createCharacter(
      "seconduser",
      "third character",
      "ranger"
    );

    const deleteWrongCharacter = await Character.deleteCharacter("firstuser", "second character");

    expect(deleteWrongCharacter.ok).toBeFalsy(); // cannot delete character of different user

    // TODO
    // let amountOfCharacters = (await Character.collection.find({}).toArray()).length;

    // expect(amountOfCharacters).toBe(3);

    // const deleteCorrectCharacter = await Character.deleteCharacter("firstuser", "first character");

    // expect(deleteCorrectCharacter.ok).toBeTruthy();

    // amountOfCharacters = (await Character.collection.find({}).toArray()).length;

    // expect(amountOfCharacters).toBe(2);
  });
});

describe("move deleted character to deletedCharacters collection", async () => {
  test("1", async () => {
    await Character.createCharacter("testuser", "first character", "ranger");

    const deleteQueryResult = await Character.deleteCharacter("testuser", "first character");
    expect(deleteQueryResult.ok).toBeTruthy();

    // TODO
    // const deletedCharacters = await deletedCharactersCollection.find({}).toArray();
    //
    // expect(deletedCharacters.length).toBe(1);
  });
});
