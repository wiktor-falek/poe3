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
var lobbyManager_js_1 = require("../game/lobby/lobbyManager.js");
var resultat_1 = require("resultat");
function registerLobbyHandler(io, socket, client) {
    var getAll = function () {
        socket.emit("lobby:all", lobbyManager_js_1.default.visibleLobbies);
    };
    var getCurrent = function () {
        var lobby = lobbyManager_js_1.default.currentLobby(client);
        if (lobby !== undefined) {
            socket.emit("lobby:data", lobby.membersOnlyData);
        }
        else {
            socket.emit("lobby:data", null);
        }
    };
    var join = function (_lobbyId) {
        // TODO: validate
        var lobbyId = _lobbyId; // schema.validate(_lobbyId);
        var result = lobbyManager_js_1.default.joinLobby(client, lobbyId);
        if (!result.ok) {
            // TODO: emit error
            return;
        }
        var lobby = result.val;
        socket.join(lobby.room);
        io.to(lobby.room).emit("lobby:data", __assign(__assign({}, lobby), { members: lobby.members }));
        socket.emit("lobby:set", lobby);
    };
    var leave = function () {
        var lobby = lobbyManager_js_1.default.currentLobby(client);
        if (lobby === undefined) {
            return (0, resultat_1.Err)("TODO: Emit 'Lobby not found'");
        }
        var success = lobby.leave(client);
        if (!success) {
            return;
        }
        socket.leave(lobby.room);
        socket.emit("lobby:data", null);
        // TODO: this could be a separate ServerToClient emit 'lobby:member-leave' => (name: string) => void;
        socket.to(lobby.room).emit("lobby:data", lobby.membersOnlyData);
        if (lobby.size === 0) {
            lobbyManager_js_1.default.deleteLobby(lobby);
            io.emit("lobby:delete", lobby.id);
        }
    };
    var create = function (_lobbyName) {
        // TODO: validate
        var lobbyName = _lobbyName; // schema.validate(_name)
        var existingLobby = lobbyManager_js_1.default.currentLobby(client);
        if (existingLobby !== undefined) {
            return;
            // TODO: emit error
            // socket.emit("error", "")
        }
        var lobby = lobbyManager_js_1.default.createLobby(client, lobbyName);
        join(lobby.id);
        io.emit("lobby:set", lobby);
    };
    var kick = function (_characterName) {
        // TODO: validate
        var characterName = _characterName; // schema.validate(_characterName);
        var lobby = lobbyManager_js_1.default.currentLobby(client);
        if (lobby === undefined) {
            // TODO: emit error?
            return;
        }
        var targetClient = lobby.kick(characterName);
        if (targetClient === undefined) {
            // TODO: emit error?
            return;
        }
        targetClient.socket.leave(lobby.room);
        targetClient.socket.emit("lobby:data", null);
        io.to(lobby.room).emit("lobby:data", __assign(__assign({}, lobby), { members: lobby.members }));
    };
    socket.on("lobby:getAll", getAll);
    socket.on("lobby:getCurrent", getCurrent);
    socket.on("lobby:join", join);
    socket.on("lobby:leave", leave);
    socket.on("lobby:create", create);
    socket.on("lobby:kick", kick);
}
exports.default = registerLobbyHandler;
