"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var instanceManager_js_1 = require("../game/instance/instanceManager.js");
var lobbyManager_js_1 = require("../game/lobby/lobbyManager.js");
var message_js_1 = require("../components/message.js");
function registerInstanceHandler(io, socket, client) {
    var create = function () {
        // if lobby exists prevent non-owner from creating a lobby
        var lobby = lobbyManager_js_1.default.currentLobby(client);
        if (lobby && !lobby.clientIsOwner(client)) {
            return;
        }
        if (lobby) {
            lobby.isHidden = true;
        }
        // initialize instance
        var instance = instanceManager_js_1.default.createInstance();
        var clients = lobby === undefined ? [client] : __spreadArray([], lobby.clients, true);
        // handle instance join for each client
        for (var _i = 0, clients_1 = clients; _i < clients_1.length; _i++) {
            var client_1 = clients_1[_i];
            instance.join(client_1);
            client_1.instanceId = instance.id;
            client_1.socket.join(instance.room);
        }
        io.to(instance.room).emit("instance:set", instance);
    };
    var leave = function () {
        var instance = instanceManager_js_1.default.currentInstance(client);
        if (instance === undefined) {
            // TODO: emit error
            return;
        }
        instance.leave(client);
        client.instanceId = null;
        if (Object.keys(instance).length === 0) {
            // all clients left
            instanceManager_js_1.default.deleteInstance(instance);
        }
        socket.emit("instance:set", null);
        socket.leave(instance.room);
        socket
            .to(instance.room)
            .emit("chat:message", new message_js_1.PartyMessage("".concat(client.characterName, " has left the area"), "SYSTEM"));
    };
    socket.on("instance:create", create);
    socket.on("instance:leave", leave);
}
exports.default = registerInstanceHandler;
