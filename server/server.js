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
    console.log("dziala");
    socket.on('updateGameState', (data) => {
        socket.to(data.roomCode).emit('retGameState', {receiveNewGameState: data.newGameState,receivePlayerTurn: data.playerTurn,receiveWhoWon: data.whoWon})
    });

    socket.on('join_room', (data) => {
        socket.join(data)
        console.log(`user ${socket.id} connected to ${data}`);
    }); 
})

server.listen(3000, () => {
    console.log('serwer cię słyszy')
});