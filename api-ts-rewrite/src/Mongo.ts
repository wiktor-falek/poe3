import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/items?retryWrites=true&w=majority`
    : "mongodb://127.0.0.1:27017";

class Mongo {
  private static client: MongoClient;

  static isInitialized() {
    return this.client !== undefined;
  }

  static getClient(): MongoClient {
    if (!this.isInitialized()) {
      // Initialize the connection
      this.client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
    }
    return this.client;
  }

  static async connect() {
    try {
      // Connect the client to the server (optional starting in v4.7)
      await this.client.connect();
      // Send a ping to confirm a successful connection
      await this.client.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } catch {
      console.log("Connection to database failed. Have you included credentials inside .env file?");
    } finally {
      // Ensures that the client will close when you finish/error
      await this.client.close();
    }
  }
}

export default Mongo;
