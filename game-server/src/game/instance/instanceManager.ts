import Client from "../../components/client/client.js";
import Instance from "./instance.js";

class InstanceManager {
  static readonly instances: { [instanceId: string]: Instance } = {};

  static createInstance(): Instance {
    const instance = new Instance();
    this.instances[instance.id] = instance;
    return instance;
  }

  static deleteInstance(instance: Instance) {
    delete this.instances[instance.id];
  }

  static getInstance(instanceId: string): Instance | null {
    return this.instances[instanceId];
  }

  static currentInstance(client: Client): Instance | null {
    const instanceId = client.instanceId;
    if (instanceId === null) return null;
    return this.instances[instanceId];
  }
}

export default InstanceManager;
