import request from "supertest";
import app from "../app.js";
import { beforeAll, describe, expect, test } from "vitest";
import Mongo from "../mongo.js";

const client = Mongo.getClient();
client.connect();

beforeAll(async () => {
  // TODO: register an account
  // TODO: login and get the session cookie
});

describe("creating a character", async () => {
  test("status code 422 with missing body", async () => {
    const response = await request(app).post("/api/characters").send();

    expect(response.statusCode).toBe(422);
  });
});
