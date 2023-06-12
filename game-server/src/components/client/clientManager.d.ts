import { StaticCharacter, User } from "../../../../common/types/index.js";
import { IoSocket } from "../../index.js";
import Client from "./client.js";
import type { WithId } from "mongodb";
declare class ClientManager {
    static readonly clients: Map<string, Client>;
    static getClientByUsername(username: string): Client;
    static createClient(user: WithId<User>, character: WithId<StaticCharacter>, socket: IoSocket): Client;
}
export default ClientManager;
//# sourceMappingURL=clientManager.d.ts.map