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
Object.defineProperty(exports, "__esModule", { value: true });
var resultat_1 = require("resultat");
var lobby_js_1 = require("./lobby.js");
var LobbyManager = /** @class */ (function () {
    function LobbyManager() {
    }
    Object.defineProperty(LobbyManager, "visibleLobbies", {
        get: function () {
            // returns lobbies excluding ones where isHidden is true;
            var copy = __assign({}, this.lobbies);
            for (var _i = 0, _a = Object.keys(copy); _i < _a.length; _i++) {
                var key = _a[_i];
                copy[key].isHidden && delete copy[key];
            }
            return copy;
        },
        enumerable: false,
        configurable: true
    });
    LobbyManager.currentLobby = function (client) {
        return Object.values(this.lobbies).find(function (lobby) { return lobby.clientIsInLobby(client); });
    };
    LobbyManager.createLobby = function (client, name) {
        var lobby = new lobby_js_1.default(name, client.character.name);
        this.lobbies[lobby.id] = lobby;
        return lobby;
    };
    LobbyManager.deleteLobby = function (lobby) {
        delete this.lobbies[lobby.id];
    };
    LobbyManager.joinLobby = function (client, lobbyId) {
        var lobby = this.lobbies[lobbyId];
        if (lobby === undefined) {
            return (0, resultat_1.Err)("Lobby does not exist");
        }
        var existingLobby = this.currentLobby(client);
        if (existingLobby !== undefined) {
            return (0, resultat_1.Err)("Already in a lobby");
        }
        var result = lobby.join(client);
        if (!result.ok) {
            return result;
        }
        return (0, resultat_1.Ok)(lobby);
    };
    LobbyManager.lobbies = {};
    return LobbyManager;
}());
exports.default = LobbyManager;
