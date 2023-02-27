"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const pg_1 = require("pg");
const httpServer = (0, http_1.createServer)();
const dbClient = new pg_1.Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Luis2609",
    port: 5432
});
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    }
});
let users = [];
io.on("connection", (socket) => {
    if (socket.handshake.auth.name) {
        users = users.concat(socket.handshake.auth.name);
        console.log(users);
        console.log(users.length);
    }
    io.emit("userCount", users.length);
    io.emit("users", users);
    socket.on("disconnect", () => {
        users = users.filter(user => user !== socket.handshake.auth.name);
        io.emit("userCount", users.length);
        io.emit("users", users);
    });
    socket.on("message", message => io.emit("message", message));
});
httpServer.listen(3000);
