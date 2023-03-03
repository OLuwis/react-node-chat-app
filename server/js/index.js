"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const https_1 = require("https");
const socket_io_1 = require("socket.io");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
const httpsServer = (0, https_1.createServer)(app);
const io = new socket_io_1.Server(httpsServer, {
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
httpsServer.listen(3000);
