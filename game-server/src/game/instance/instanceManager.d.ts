import Client from "../../components/client/client.js";
import Instance from "./instance.js";
declare class InstanceManager {
    static readonly instances: {
        [instanceId: string]: Instance;
    };
    static createInstance(): Instance;
    static deleteInstance(instance: Instance): void;
    static getInstance(instanceId: string): Instance | undefined;
    static currentInstance(client: Client): Instance | undefined;
}
export default InstanceManager;
//# sourceMappingURL=instanceManager.d.ts.map