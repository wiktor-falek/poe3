import { MongoClient, ServerApiVersion } from "mongodb";
import { MongoMemoryServer } from "mongodb-memory-server";

const getUri = async () => {
  switch (process.env.NODE_ENV) {
    case "production":
      return "";
    case "testing":
      const mongoServer = await MongoMemoryServer.create();
      return mongoServer.getUri();
    default:
      return "mongodb://127.0.0.1:27017";
  }
};

const URI = await getUri();
// process.env.NODE_ENV === "production"
//   ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/items?retryWrites=true&w=majority`
//   : "mongodb://127.0.0.1:27017";

class Mongo {
  private static client: MongoClient;

  static isInitialized() {
    return this.client !== undefined;
  }

  static getClient(): MongoClient {
    if (!this.isInitialized()) {
      // Initialize the connection
      this.client = new MongoClient(URI, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
    return this.client;
  }
}

export default Mongo;
