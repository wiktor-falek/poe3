import { expect, it } from "vitest";
import Mongo from "../src/Mongo";

it("connects to mongodb locally", () => {
  const client = Mongo.getClient()
  expect(async () => client.connect()).not.toThrow();
});
