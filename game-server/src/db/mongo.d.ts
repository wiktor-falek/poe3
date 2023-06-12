import { MongoClient } from "mongodb";
declare class Mongo {
    private static client;
    static isInitialized(): boolean;
    static getClient(): MongoClient;
    static connect(): Promise<MongoClient>;
}
export default Mongo;
//# sourceMappingURL=mongo.d.ts.map