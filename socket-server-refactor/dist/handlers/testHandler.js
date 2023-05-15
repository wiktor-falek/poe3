"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function registerTestHandler(io, socket) {
    function hello() {
        socket.emit("basicEmit", 1, "b", Buffer.from([1, 2, 3]));
    }
    socket.on("hello", hello);
}
exports.default = registerTestHandler;
