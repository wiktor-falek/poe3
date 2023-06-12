"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var _Lobby_clients, _Lobby_isHidden;
Object.defineProperty(exports, "__esModule", { value: true });
var nanoid_1 = require("nanoid");
var resultat_1 = require("resultat");
var pyrand_1 = require("pyrand");
var LOBBY_MAX_SIZE = 4;
var Lobby = /** @class */ (function () {
    function Lobby(name, ownerName) {
        _Lobby_clients.set(this, void 0);
        _Lobby_isHidden.set(this, void 0);
        __classPrivateFieldSet(this, _Lobby_clients, {}, "f");
        __classPrivateFieldSet(this, _Lobby_isHidden, false, "f");
        this.name = name;
        this.ownerName = ownerName;
        this.id = (0, nanoid_1.nanoid)();
        this.size = 0;
    }
    Object.defineProperty(Lobby.prototype, "membersOnlyData", {
        get: function () {
            return __assign(__assign({}, this), { members: this.members });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lobby.prototype, "members", {
        get: function () {
            return Object.values(__classPrivateFieldGet(this, _Lobby_clients, "f")).map(function (client) {
                var character = client.character;
                return {
                    name: character.name,
                    class: character.class,
                    level: character.level.value,
                };
            });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lobby.prototype, "isHidden", {
        get: function () {
            return __classPrivateFieldGet(this, _Lobby_isHidden, "f");
        },
        set: function (hidden) {
            __classPrivateFieldSet(this, _Lobby_isHidden, hidden, "f");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lobby.prototype, "clients", {
        get: function () {
            return Object.values(__classPrivateFieldGet(this, _Lobby_clients, "f"));
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Lobby.prototype, "room", {
        get: function () {
            return "lobby:".concat(this.id);
        },
        enumerable: false,
        configurable: true
    });
    Lobby.prototype.clientIsInLobby = function (client) {
        var member = Object.values(__classPrivateFieldGet(this, _Lobby_clients, "f")).find(function (member) {
            return member.character._id.equals(client.character._id);
        });
        return member !== undefined;
    };
    Lobby.prototype.join = function (client) {
        if (this.size === LOBBY_MAX_SIZE) {
            return (0, resultat_1.Err)("Lobby is full");
        }
        if (__classPrivateFieldGet(this, _Lobby_clients, "f")[client.character._id.toString()] !== undefined) {
            return (0, resultat_1.Err)("Already in the lobby");
        }
        __classPrivateFieldGet(this, _Lobby_clients, "f")[client.character._id.toString()] = client;
        this.size++;
        return (0, resultat_1.Ok)(1);
    };
    Lobby.prototype.leave = function (client) {
        var isInLobby = __classPrivateFieldGet(this, _Lobby_clients, "f")[client.character._id.toString()] !== undefined;
        if (!isInLobby) {
            return false;
        }
        delete __classPrivateFieldGet(this, _Lobby_clients, "f")[client.character._id.toString()];
        this.size--;
        if (this.size > 0) {
            // transfer ownership after leaving to a random client
            var randomClient = (0, pyrand_1.choice)(Object.values(__classPrivateFieldGet(this, _Lobby_clients, "f")));
            this.ownerName = randomClient.characterName;
        }
        return true;
    };
    Lobby.prototype.kick = function (characterName) {
        var targetClient = Object.values(__classPrivateFieldGet(this, _Lobby_clients, "f")).find(function (client) { return client.characterName === characterName; });
        if (targetClient !== undefined) {
            delete __classPrivateFieldGet(this, _Lobby_clients, "f")[targetClient.character._id.toString()];
            this.size--;
        }
        return targetClient;
    };
    Lobby.prototype.clientIsOwner = function (client) {
        return this.ownerName === client.characterName;
    };
    return Lobby;
}());
_Lobby_clients = new WeakMap(), _Lobby_isHidden = new WeakMap();
exports.default = Lobby;
