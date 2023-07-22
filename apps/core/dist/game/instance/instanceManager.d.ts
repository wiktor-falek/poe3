import Client from "../../components/client/client.js";
import Instance from "./dungeon.js";
declare class InstanceManager {
    static readonly instances: {
        [instanceId: string]: Instance;
    };
    static createInstance(): Instance;
    static deleteInstance(instance: Instance): void;
    static getInstance(instanceId: string): Instance | null;
    static currentInstance(client: Client): Instance | null;
}
export default InstanceManager;
