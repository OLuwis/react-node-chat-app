import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
app.use(cors())

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL || "*",
    }
});

let users:{ user: string, id: string }[] = [];

let messages:{ user: string, message: string, id: string }[] = [];

io.on("connection", (socket) => {
    if (socket.handshake.auth.name) {
        users = users.concat({ 
            user: socket.handshake.auth.name,
            id: socket.id
        });
        io.emit("userCount", users.length);
        io.emit("users", users);
        io.emit("messages", messages)
    };
    socket.on("disconnect", () => {
        users = users.filter(user => user.id !== socket.id);
        io.emit("userCount", users.length);
        io.emit("users", users);
    });
    socket.on("message", (message) => {
        messages = messages.concat({ user:message.user, message: message.message, id: message.id })
        io.emit("messages", messages)
    });
});

httpServer.listen(3000);