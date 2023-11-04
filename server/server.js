const express = require("express")
const http = require("http")
const {Server} = require("socket.io")
const cors = require("cors") 

const app = express()
app.use(cors())

const server = http.createServer(app) 
const io = new Server(server, {
    cors: {origin: "http://localhost:5173"}
})

io.on('connection', (socket) => {
    // main game data
    socket.on('updateGameState', (data) => {
        socket.nsp.to(data.roomCode).emit('retGameState', {receiveNewGameState: data.newGameState, receivePlayerTurn: data.Turn});
    });

    // restart game
    socket.on("restartGame", (data) => {
        socket.nsp.to(data).emit("retRestartGame");
    });

    // set winner
    socket.on("whoWon", (data) => {
        socket.nsp.to(data.roomCode).emit("retWhoWon", {winner: data.Turn, Xscore: data.scoreX, Oscore: data.scoreO});
    });

    // join room
    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`user ${socket.id} connected to ${data}`);
    }); 
})

server.listen(3000, () => {

});