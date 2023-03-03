import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer((req, res) => {
    const headers = {
        "Access-Control-Allow-Origin": process.env.CLIENT_URL || "*",
        "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
        "Access-Control-Max-Age": 2592000, // 30 days
        /** add other headers as per requirement */
        };

        if (req.method === "OPTIONS") {
        res.writeHead(204, headers);
        res.end();
        return;
        }

        res.writeHead(405, headers);
        res.end(`${req.method} is not allowed for the request.`);
});

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