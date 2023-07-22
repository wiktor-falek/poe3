import Instance from "./dungeon.js";
class InstanceManager {
    static instances = {};
    static createInstance() {
        const instance = new Instance();
        this.instances[instance.id] = instance;
        return instance;
    }
    static deleteInstance(instance) {
        delete this.instances[instance.id];
    }
    static getInstance(instanceId) {
        return this.instances[instanceId];
    }
    static currentInstance(client) {
        const instanceId = client.instanceId;
        if (instanceId === null)
            return null;
        return this.instances[instanceId];
    }
}
export default InstanceManager;
