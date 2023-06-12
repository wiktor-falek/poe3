"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var initialize_js_1 = require("./middlewares/initialize.js");
var chatHandler_js_1 = require("./handlers/chatHandler.js");
var mongo_js_1 = require("./db/mongo.js");
var assert_js_1 = require("./utils/assert.js");
var lobbyHandler_js_1 = require("./handlers/lobbyHandler.js");
var lobbyManager_js_1 = require("./game/lobby/lobbyManager.js");
var instanceHandler_js_1 = require("./handlers/instanceHandler.js");
await mongo_js_1.default.connect();
var httpServer = (0, http_1.createServer)();
var io = new socket_io_1.Server(httpServer, {
    transports: ["websocket", "polling"],
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"],
        credentials: true,
    },
});
// global middlewares
io.use(initialize_js_1.default);
io.on("connection", function (socket) {
    // TypeScript doesn't know that this connection does not happen
    // unless socket.data.client is defined in initialize middleware,
    // since SocketData is wrapped in Partial<>
    (0, assert_js_1.default)(socket.data.client);
    var client = socket.data.client;
    client.setConnected();
    socket.on("error", function (err) {
        // socket.emit("connectionError");
    });
    socket.onAny(function (event) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        console.log(event, args);
    });
    (0, chatHandler_js_1.default)(io, socket, client);
    (0, lobbyHandler_js_1.default)(io, socket, client);
    (0, instanceHandler_js_1.default)(io, socket, client);
    console.log("".concat(client.characterName, " (").concat(client.username, ") connected"));
    socket.on("disconnect", function (reason, description) {
        client.setDisconnected();
        // handle disconnect
        // TODO: make this dry if possible
        var lobby = lobbyManager_js_1.default.currentLobby(client);
        if (lobby !== undefined) {
            lobby.leave(client);
            io.to(lobby.room).emit("lobby:data", lobby.membersOnlyData);
            lobby.id;
            if (lobby.size === 0) {
                lobbyManager_js_1.default.deleteLobby(lobby);
            }
        }
        console.log("".concat(client.characterName, " (").concat(client.username, ") disconnected (").concat(reason, ")"));
    });
});
httpServer.listen(4000, function () {
    console.log("http://localhost:4000");
});
