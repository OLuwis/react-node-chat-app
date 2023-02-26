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
        origin: "http://localhost:3001",
    }
});
io.on("connection", (socket) => {
    socket.on("new action", (msg) => {
        dbClient.query(`INSERT INTO public.messages (message_user, message) VALUES ('test user', 'third test text')`);
    });
});
httpServer.listen(3000);
