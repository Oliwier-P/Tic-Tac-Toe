import express from "express";
import { createServer } from "http";
import cors from "cors";
import { Server } from "socket.io";

const app = express();
app.use(cors());

const server = createServer(app);
const io = new Server(server, { cors: { origin: "https://localhost:5173" } });

io.on("connection", (socket) => {
  socket.on("create_room", () => {
    console.log("Create room");

    const roomCode = "12345";

    socket.nsp.to(socket.id).emit("receive_room_data");
  });

  socket.on("join_room", (roomCode: string) => {
    console.log("Join room");

    socket.join(roomCode);

    socket.nsp.to(roomCode).emit("receive_room_data");
  });
});

server.listen(3000, () => {});
