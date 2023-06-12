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
var _Client_user, _Client_character, _Client_isConnected, _Client_disconnectTimestamp, _Client_socket, _Client_instanceId;
Object.defineProperty(exports, "__esModule", { value: true });
var Client = /** @class */ (function () {
    function Client(user, character, socket) {
        _Client_user.set(this, void 0);
        _Client_character.set(this, void 0);
        _Client_isConnected.set(this, void 0);
        _Client_disconnectTimestamp.set(this, void 0);
        _Client_socket.set(this, void 0);
        _Client_instanceId.set(this, void 0);
        __classPrivateFieldSet(this, _Client_user, user, "f");
        __classPrivateFieldSet(this, _Client_character, character, "f");
        __classPrivateFieldSet(this, _Client_isConnected, false, "f");
        __classPrivateFieldSet(this, _Client_disconnectTimestamp, null, "f");
        __classPrivateFieldSet(this, _Client_socket, socket, "f");
        __classPrivateFieldSet(this, _Client_instanceId, null, "f");
    }
    Object.defineProperty(Client.prototype, "character", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_character, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "isConnected", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_isConnected, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "username", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_user, "f").account.username;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "characterName", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_character, "f").name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "disconnectedTimestamp", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_disconnectTimestamp, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "socket", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_socket, "f");
        },
        set: function (socket) {
            __classPrivateFieldSet(this, _Client_socket, socket, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "instanceId", {
        get: function () {
            return __classPrivateFieldGet(this, _Client_instanceId, "f");
        },
        set: function (id) {
            __classPrivateFieldSet(this, _Client_instanceId, id, "f");
        },
        enumerable: false,
        configurable: true
    });
    Client.prototype.setConnected = function () {
        __classPrivateFieldSet(this, _Client_disconnectTimestamp, null, "f");
        __classPrivateFieldSet(this, _Client_isConnected, true, "f");
    };
    Client.prototype.setDisconnected = function () {
        __classPrivateFieldSet(this, _Client_disconnectTimestamp, Date.now(), "f");
        __classPrivateFieldSet(this, _Client_isConnected, false, "f");
    };
    return Client;
}());
_Client_user = new WeakMap(), _Client_character = new WeakMap(), _Client_isConnected = new WeakMap(), _Client_disconnectTimestamp = new WeakMap(), _Client_socket = new WeakMap(), _Client_instanceId = new WeakMap();
exports.default = Client;
