"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var client_js_1 = require("./client.js");
var ClientManager = /** @class */ (function () {
    function ClientManager() {
    }
    ClientManager.getClientByUsername = function (username) {
        var client = this.clients.get(username);
        return client;
    };
    ClientManager.createClient = function (user, character, socket) {
        var client = new client_js_1.default(user, character, socket);
        this.clients.set(user.account.username, client);
        return client;
    };
    ClientManager.clients = new Map();
    return ClientManager;
}());
exports.default = ClientManager;
