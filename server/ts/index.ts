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
        origin: "http://localhost:3001",
    }
});

io.on("connection", (socket) => {
    socket.on("new action", (msg) => {
        dbClient.query(`INSERT INTO public.messages (message_user, message) VALUES ('test user', 'third test text')`);
    })
});

httpServer.listen(3000);