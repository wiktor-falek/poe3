import Client from "../../components/client/client.js";
import Instance from "./instance.js";

class InstanceManager {
  static readonly instances: { [instanceId: string]: Instance } = {};

  static createInstance(): Instance {
    const instance = new Instance();
    this.instances[instance.id] = instance;
    return instance;
  }

  static getInstance(instanceId: string): Instance | undefined {
    return this.instances[instanceId];
  }

  static currentInstance(client: Client): Instance | undefined {
    const instanceId = client.instanceId;
    if (instanceId === null) return undefined;
    return this.instances[instanceId];
  }
}

export default InstanceManager;
