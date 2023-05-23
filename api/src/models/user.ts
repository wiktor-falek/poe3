import bcrypt from "bcrypt";
import Joi from "joi";
import Mongo from "../mongo.js";
import { v4 as uuidv4 } from "uuid";
import { decode, encode } from "../utils/token.js";
import { Ok, Err } from "resultat";
import { sendEmail } from "../utils/email.js";

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

  static async findByEmail(email: string) {
    const user = await this.collection.findOne({
      "account.email": email,
      "account.hasConfirmedEmail": true,
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
  ) {
    const user = await this.collection.findOne({
      $or: [
        { "account.username": username },
        { "account.email": email, "account.hasConfirmedEmail": true },
      ],
    });

    if (user?.account.username === username) {
      return Err("Username is already in use");
    }

    if (user?.account.email === email) {
      return Err("Email is already in use");
    }

    return Ok(1);
  }

  static async register(username: string, password: string, email: string) {
    const userInput = {
      account: { username, email },
    };

    const validationResult = userSchema.validate(userInput);

    if (validationResult.error) {
      return Err("Data validation failed");
    }

    interface NewUser {
      account: { hash: string };
    }

    const newUser: NewUser = validationResult.value;

    const available = await this.usernameAndEmailIsAvailable(username, email);
    if (!available.ok) {
      return Err(available.err);
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    newUser.account.hash = hash;

    const result = await this.collection.insertOne(newUser);
    if (!result.acknowledged) {
      return Err("Database write failed");
    }

    return Ok(1);
  }

  static async login(username: string, password: string) {
    const user = await User.findByUsername(username);

    if (user === null) {
      return Err("Incorrect username or password");
    }

    const isAuthenticated = await bcrypt.compare(password, user.account.hash);
    if (!isAuthenticated) {
      return Err("Incorrect username or password");
    }

    const sessionId = uuidv4();

    const result = await this.collection.updateOne(
      { "account.username": username },
      { $set: { "account.sessionId": sessionId } }
    );

    if (result.modifiedCount !== 1) {
      return Err("Database write failed");
    }
    return Ok({ sessionId });
  }

  static async verify(token: string) {
    const payload = decode(token);

    if (payload === null) {
      return Err("Invalid token");
    }

    const { username, email, iat, exp } = payload;

    const userWithEmailTaken = await this.collection.findOne(
      {
        "account.email": email,
        "account.hasConfirmedEmail": true,
      },
      { projection: { "account.username": 1, _id: 0 } }
    );

    if (userWithEmailTaken?.account.username === username) {
      return Err("Your email is already verified");
    }

    if (userWithEmailTaken !== null) {
      return Err("Something went wrong");
    }

    const result = await this.collection.updateOne(
      {
        "account.username": username,
        "account.email": email,
        "account.hasConfirmedEmail": false,
      },
      { $set: { "account.hasConfirmedEmail": true } }
    );

    if (result.modifiedCount === 0) {
      return Err("Something went wrong");
    }

    return Ok({ username, verified: true });
  }

  static async recoverPassword(email: string) {
    const user = await User.findByEmail(email);

    if (user === null) {
      return;
    }

    const username = user.account.username;

    const token = encode({ username: username, email: email });

    const url = `http://localhost:5173/recovery/?token=${token}`;

    if (process.env.NODE_ENV === "production") {
      sendEmail(
        email,
        "Account Recovery",
        `Hi ${username}\nClick the link below to change your password.\n${url}\nIf you did not try to recover you account simply ignore this email.`,
        `<h1>Hi ${username}</h1>\n<h2>Click the link below to change your password.</h2>\n<a href="${url}">Reset Password</a>\nIf you did not try to recover you account simply ignore this email.`
      );
    } else {
      console.log(`Account recovery link:\n${url}`);
    }
  }

  static async changePassword(token: string, password: string) {
    const payload = decode(token);
    if (payload === null) {
      return Err("Invalid token");
    }
    const { username, email } = payload;

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);

    const result = await this.collection.updateOne(
      {
        "account.username": username,
      },
      { $set: { "account.hash": hash } }
    );

    if (result.modifiedCount === 0) {
      return Err("Failed to change the password");
    }

    return Ok(1);
  }
}

// Indexes
await User.collection.createIndexes([
  {
    key: {
      "account.sessionId": 1,
    },
  },
  {
    key: {
      "account.username": 1,
    },
  },
]);

export default User;
export { userSchema };
