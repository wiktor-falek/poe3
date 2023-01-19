import { MongoClient, Timestamp } from "mongodb";
import type { Db } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class Mongo {
  URI: string;
  client: MongoClient;
  db: Db;

  constructor() {
    this.URI =
      process.env.NODE_ENV === "production"
        ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/items?retryWrites=true&w=majority`
        : "mongodb://127.0.0.1:27017";
        
    this.client = new MongoClient(this.URI);
    this.client.connect();
    this.db = this.client.db("game");
  }
}

export default new Mongo();
