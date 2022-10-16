import Instance from "./Instance";

interface Instances {
  [key: string]: Instance;
}

class InstanceFactory {
  instances: Instances;
  constructor() {
    this.instances = {};
  }

  createInstance(userId: string, zoneId: number) {
    const instance = new Instance(zoneId);
    this.#addInstance(userId, instance);
    return instance;
  }

  deleteInactiveInstances(timeoutSeconds: number = 300) {
    // this will run inside cron job
    const instances = Object.entries(this.instances);
    const timestamp = Date.now();
    for (let i = 0; i < instances.length; i++) {
      const [id, instance] = instances[i];
      if (instance.playerIsConnected) {
        continue;
      }
      if (timestamp - instance.timestamp >= timeoutSeconds) {
        delete this.instances[id];
      }
    }
  }

  getInstance(userId: string): Instance | null {
    return this.instances[userId] || null;
  }

  #addInstance(userId: string, instance: Instance) {
    this.instances[userId] = instance;
  }
}

export default new InstanceFactory();
