"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var instance_js_1 = require("./instance.js");
var InstanceManager = /** @class */ (function () {
    function InstanceManager() {
    }
    InstanceManager.createInstance = function () {
        var instance = new instance_js_1.default();
        this.instances[instance.id] = instance;
        return instance;
    };
    InstanceManager.deleteInstance = function (instance) {
        delete this.instances[instance.id];
    };
    InstanceManager.getInstance = function (instanceId) {
        return this.instances[instanceId];
    };
    InstanceManager.currentInstance = function (client) {
        var instanceId = client.instanceId;
        if (instanceId === null)
            return undefined;
        return this.instances[instanceId];
    };
    InstanceManager.instances = {};
    return InstanceManager;
}());
exports.default = InstanceManager;
