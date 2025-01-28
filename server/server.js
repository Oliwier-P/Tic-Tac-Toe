const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

const roomData = new Map();

io.on("connection", (socket) => {
  socket.on("create_room", (roomCode, callback) => {
    const roomExists = roomData.has(roomCode);

    if (!roomExists) {
      roomData.set(roomCode, new Set());
      roomData.get(roomCode).add(socket.id);

      socket.join(roomCode);
    }

    callback(roomExists);
  });

  socket.on("join_room", (roomCode, callback) => {
    let roomExists = !roomData.has(roomCode)
      ? "non-existent"
      : Array.from(roomData.get(roomCode)).length < 2
      ? "join"
      : "full";

    if (roomExists == "join") {
      roomData.get(roomCode).add(socket.id);

      socket.join(roomCode);
    }

    callback(roomExists);
  });
});

server.listen(3000, () => {});
