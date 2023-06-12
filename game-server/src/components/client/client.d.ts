import { WithId } from "mongodb";
import { StaticCharacter, User } from "../../../../common/types/index.js";
import { IoSocket } from "../../index.js";
declare class Client {
    #private;
    constructor(user: WithId<User>, character: WithId<StaticCharacter>, socket: IoSocket);
    get character(): WithId<StaticCharacter>;
    get isConnected(): boolean;
    get username(): string;
    get characterName(): string;
    get disconnectedTimestamp(): number;
    get socket(): IoSocket;
    set socket(socket: IoSocket);
    get instanceId(): string | null;
    set instanceId(id: string | null);
    setConnected(): void;
    setDisconnected(): void;
}
export default Client;
//# sourceMappingURL=client.d.ts.map