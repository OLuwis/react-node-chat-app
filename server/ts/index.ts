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

io.on("connection", (socket) => {
    
});

httpServer.listen(3000);