import bcrypt from "bcrypt";
import Joi from "joi";
import Mongo from "../Mongo.js";
import type { Result } from "../../../utils.js";
import { v4 as uuidv4 } from "uuid";

const userSchema = Joi.object({
  account: Joi.object({
    username: Joi.string().alphanum().min(6).max(30).required(),
    email: Joi.string().min(6).max(254).required(),
    hasConfirmedEmail: Joi.bool().default(false),
    registrationTimestamp: Joi.number().integer().default(Date.now()),
    sessionId: Joi.string().default(null),
    characterLimit: Joi.number().integer().min(12).max(36).default(12),
  }),
  social: Joi.object({
    friends: Joi.array().default([]),
  }),
  shared_stash: Joi.array().default(new Array(20).fill(null)),
});

class User {
  private static db = Mongo.getClient().db("game");
  static collection = this.db.collection("users");

  static async findByUsername(username: string) {
    const user = await this.collection.findOne({
      "account.username": username,
    });

    return user;
  }

  static async usernameIsTaken(username: string) {
    const user = await this.collection.findOne({
      "account.username": username,
    });

    return user !== null;
  }

  static async emailIsTaken(email: string) {
    const user = await this.collection.findOne({
      "account.email": email,
      "account.hasConfirmedEmail": true,
    });

    return user !== null;
  }

  private static async usernameAndEmailIsAvailable(
    username: string,
    email: string
  ): Promise<Result> {
    const user = await this.collection.findOne({
      $or: [
        { "account.username": username },
        { "account.email": email, "account.hasConfirmedEmail": true },
      ],
    });

    if (user?.account.username === username) {
      return { ok: false, error: "Username is already in use" };
    }

    if (user?.account.email === email) {
      return { ok: false, error: "Email is already in use" };
    }

    return { ok: true };
  }

  static async register(
    username: string,
    password: string,
    email: string
  ): Promise<Result> {
    const userInput = {
      account: { username, email },
    };

    const newUserData = await userSchema.validateAsync(userInput);
    if (newUserData.error) {
      const error = newUserData.error.details[0].message;
      return { ok: false, error };
    }

    const available = await this.usernameAndEmailIsAvailable(username, email);
    if (!available.ok) {
      return { ok: false, error: available.error };
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    newUserData.account.hash = hash;

    const result = await this.collection.insertOne(newUserData);

    if (!result.acknowledged) {
      return { ok: false, error: "Database write failed" };
    }

    return { ok: true };
  }

  static async login(username: string, password: string): Promise<Result> {
    const user = await User.findByUsername(username);

    if (user === null) {
      return { ok: false, error: "Invalid username" };
    }

    const isAuthenticated = await bcrypt.compare(password, user.account.hash);

    if (!isAuthenticated) {
      return { ok: false, error: "Invalid password" };
    }

    const sessionId = uuidv4();

    

    //     const result = await User.collection.updateOne(
    //       { "account.username": username },
    //       { $set: {"account.sessionId": sessionId}}
    //     );

    //     if (result.acknowledged) {
    //       res.cookie("username", username, { httpOnly: false, secure: true, sameSite: "strict" });
    //       res.cookie("sessionId", sessionId, { httpOnly: false, secure: true,  sameSite: "strict" });
    //       return res.json({username, sessionId});
    //     }
    //     res.status(400).json({ error: "Something went wrong" });
    //   }
    // );

    return { ok: false, error: "Not Implemented" };
  }
}

export default User;
export { userSchema };
