import { Db, MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class Mongo {
  URI: string;
  client: MongoClient;
  db: Db;
  constructor() {
    this.URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/?retryWrites=true&w=majority`;
    // process.env.NODE_ENV === "production"
    // ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/?retryWrites=true&w=majority`
    // : "mongodb://127.0.0.1:27017/game";

    this.client = new MongoClient(this.URI);
    this.client.connect();
    this.db = this.client.db();
  }
}

export default new Mongo();
