"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const uri = process.env.NODE_ENV === "production"
    ? `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.4zrjv3n.mongodb.net/items?retryWrites=true&w=majority`
    : "mongodb://127.0.0.1:27017";
class Mongo {
    static isInitialized() {
        return this.client !== undefined;
    }
    static getClient() {
        if (!this.isInitialized()) {
            // Initialize the connection
            this.client = new mongodb_1.MongoClient(uri, {
                serverApi: {
                    version: mongodb_1.ServerApiVersion.v1,
                    strict: true,
                    deprecationErrors: true,
                },
            });
        }
        return this.client;
    }
    static connect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect the client to the server (optional starting in v4.7)
                yield this.client.connect();
                // Send a ping to confirm a successful connection
                yield this.client.db("admin").command({ ping: 1 });
                console.log("Pinged your deployment. You successfully connected to MongoDB!");
            }
            catch (_a) {
                console.log("Connection to database failed");
            }
            finally {
                // Ensures that the client will close when you finish/error
                yield this.client.close();
            }
        });
    }
}
exports.default = Mongo;
