"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
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
    socket.on("disconnect", () => {
    });
});
