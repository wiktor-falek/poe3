import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

class Game {
  constructor() {
    this.URI =
      process.env.NODE_ENV === "production"
        ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/game?retryWrites=true&w=majority`
        : "mongodb://127.0.0.1:27017/game";

    this.client = new MongoClient(this.URI);
    this.init();
  }
  
  init() {
    this.client.connect();
    this.db = this.client.db();
  }
}
3
export default new Game();
