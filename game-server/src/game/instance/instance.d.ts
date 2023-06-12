import Client from "../../components/client/client.js";
import { DynamicCharacter } from "../../../../common/types/index.js";
export interface InstanceData {
    someData: {
        test: string;
    };
}
declare class Instance implements InstanceData {
    #private;
    characters: {
        [characterId: string]: DynamicCharacter;
    };
    someData: {
        test: string;
    };
    constructor();
    get clients(): Client[];
    get id(): string;
    get room(): string;
    join(client: Client): void;
    leave(client: Client): void;
}
export default Instance;
//# sourceMappingURL=instance.d.ts.map