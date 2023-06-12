"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _Instance_clients, _Instance_id;
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var getDynamicCharacter_js_1 = require("../../../../common/getDynamicCharacter.js");
var Instance = /** @class */ (function () {
    function Instance() {
        _Instance_clients.set(this, void 0);
        _Instance_id.set(this, void 0);
        __classPrivateFieldSet(this, _Instance_clients, {}, "f");
        this.characters = {};
        __classPrivateFieldSet(this, _Instance_id, (0, nanoid_1.nanoid)(), "f");
        this.someData = { test: "Instance Data" };
    }
    Object.defineProperty(Instance.prototype, "clients", {
        get: function () {
            return Object.values(__classPrivateFieldGet(this, _Instance_clients, "f"));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Instance.prototype, "id", {
        get: function () {
            return __classPrivateFieldGet(this, _Instance_id, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Instance.prototype, "room", {
        get: function () {
            return "instance:".concat(__classPrivateFieldGet(this, _Instance_id, "f"));
        },
        enumerable: false,
        configurable: true
    });
    Instance.prototype.join = function (client) {
        __classPrivateFieldGet(this, _Instance_clients, "f")[client.character._id.toString()] = client;
        this.characters[client.character._id.toString()] = (0, getDynamicCharacter_js_1.getDynamicCharacter)(client.character);
    };
    Instance.prototype.leave = function (client) {
        delete __classPrivateFieldGet(this, _Instance_clients, "f")[client.character._id.toString()];
    };
    return Instance;
}());
_Instance_clients = new WeakMap(), _Instance_id = new WeakMap();
exports.default = Instance;
