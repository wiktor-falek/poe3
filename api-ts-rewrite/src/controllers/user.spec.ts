import request from "supertest";
import app from "../app.js";
import { beforeAll, describe, expect, test } from "vitest";
import Mongo from "../mongo.js";

const client = Mongo.getClient();
client.connect();

beforeAll(async () => {
  await client.db("game").collection("users").deleteMany();
});

describe("register", async () => {
  test("status code 422 with missing body", async () => {
    const response = await request(app)
      .post("/auth/register")
      .send({ completed: true });

    expect(response.statusCode).toBe(422);
  });

  test("status code 200 if registered the user", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "password",
      email: "testuser@domain.com",
    });

    expect(response.statusCode).toBe(200);
  });

  test("status code 400 if username is in use", async () => {
    const response = await request(app).post("/auth/register").send({
      username: "testuser",
      password: "whatever",
      email: "otheremail@domain.com",
    });

    expect(response.statusCode).toBe(400);
  });
});
