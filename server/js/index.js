"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const httpServer = (0, http_1.createServer)();
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "*",
    }
});
let users = [];
let messages = [];
io.on("connection", (socket) => {
    if (socket.handshake.auth.name) {
        users = users.concat({
            user: socket.handshake.auth.name,
            id: socket.id
        });
        io.emit("userCount", users.length);
        io.emit("users", users);
        io.emit("messages", messages);
    }
    ;
    socket.on("disconnect", () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit("userCount", users.length);
        io.emit("users", users);
    });
    socket.on("message", (message) => {
        messages = messages.concat({ user: message.user, message: message.message, id: message.id });
        io.emit("messages", messages);
    });
});

httpServer.listen(3000);
