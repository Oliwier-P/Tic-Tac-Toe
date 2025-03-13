const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const { socketsHandlers } = require("./socketsHandler");

const app = express();
app.use(cors());

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: "http://localhost:5173" },
});

const handleModulesOnConnection = async (socket) => {
  console.log(`New connection: ${socket.id}`);

  socketsHandlers(socket);

  socket.on("error", (err) => {
    console.error(`Socket error: ${err}`);
  });
};

io.on("connection", handleModulesOnConnection);

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
