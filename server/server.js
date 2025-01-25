import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "https://localhost:5173" } });

io.on("connection", (socket) => {});

server.listen(3000, () => {
  console.log("Works");
});
