const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { socketsHandlers } = require("./socketsHandler");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" },
});

const handleModulesOnConnection = async (socket) => {
  console.log(`New connection: ${socket.id}`);

  socketsHandlers(socket);

  socket.on("error", (err) => {
    console.error(`Socket error: ${err}`);
  });
};

io.on("connection", handleModulesOnConnection);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
