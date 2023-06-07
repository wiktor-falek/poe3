import Instance from "./instance.js";

class InstanceManager {
  static readonly instances: { [instanceId: string]: Instance } = {};

  static createInstance(): Instance {
    const instance = new Instance();
    this.instances[instance.id] = instance;
    return instance;
  }

  static currentInstance(): Instance | undefined {
    return undefined;
  }
}

export default InstanceManager;
