"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const testHandler_1 = __importDefault(require("./handlers/testHandler"));
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT"],
    },
});
io.on("connection", (socket) => {
    // handle errors
    // init
    // register handlers
    (0, testHandler_1.default)(io, socket);
    socket.on("disconnect", () => { });
});
httpServer.listen(4000, () => {
    console.log("listening on port 4000");
});
