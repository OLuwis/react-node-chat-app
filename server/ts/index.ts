import { createServer } from "http";
import { Server } from "socket.io";
import { Pool } from "pg";

const httpServer = createServer();

const dbClient = new Pool({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "Luis2609",
    port: 5432
});

const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:5173",
    }
});

let users:string[] = []

io.on("connection", (socket) => {
    if (socket.handshake.auth.name) {
        users = users.concat(socket.handshake.auth.name)
        console.log(users)
        console.log(users.length)
    }
    io.emit("userCount", users.length)
    io.emit("users", users)
    socket.on("disconnect", () => {
        users = users.filter(user => user !== socket.handshake.auth.name)
        io.emit("userCount", users.length)
        io.emit("users", users)
    })
    socket.on("message", message => io.emit("message", message))
});

httpServer.listen(3000);