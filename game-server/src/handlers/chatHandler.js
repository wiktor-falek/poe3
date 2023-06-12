"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("joi");
var message_js_1 = require("../components/message.js");
function registerChatHandler(io, socket, client) {
    var join = function (_roomId) {
        var schema = joi_1.default.number().required().min(1).max(1000);
        var result = schema.validate(_roomId);
        if (result.error) {
            return socket.emit("chat:message", new message_js_1.ServerMessage("Invalid argument 'room'"));
        }
        var roomId = result.value;
        var room = "global:".concat(roomId);
        // leave other global rooms, because client is
        // allowed to only be in one global room at a time
        for (var _i = 0, _a = socket.rooms; _i < _a.length; _i++) {
            var room_1 = _a[_i];
            if (room_1.startsWith("global:")) {
                socket.leave(room_1);
            }
        }
        socket.join(room);
        socket.emit("chat:message", new message_js_1.ServerMessage("You joined global room ".concat(room)));
    };
    var send = function (_message) {
        var schema = joi_1.default.string().required().min(1).max(128);
        var result = schema.validate(_message);
        if (result.error) {
            return socket.emit("chat:message", new message_js_1.ServerMessage("Invalid argument 'message'"));
        }
        var message = result.value;
        var roomName = "";
        for (var _i = 0, _a = socket.rooms.values(); _i < _a.length; _i++) {
            var room = _a[_i];
            console.log(room);
            if (room.startsWith("global:")) {
                roomName = room;
                break;
            }
        }
        io.to(roomName).emit("chat:message", new message_js_1.GlobalMessage(message, client.characterName));
    };
    socket.on("chat:join", join);
    socket.on("chat:send", send);
}
exports.default = registerChatHandler;
