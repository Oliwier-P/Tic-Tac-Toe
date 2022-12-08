import React, { useEffect, useRef, useState } from 'react'
import XoBox from '../components/XoBox'
import { GameState , PlayerTurn } from '../types';
import { Link } from 'react-router-dom';
import { render } from 'react-dom';
import {io} from 'socket.io-client';

const socket = io('http://localhost:3000')

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function Multiplayer() {
    const defaultGameState:GameState = ['','','','','','','','',''];
    const [gameState, setGameState] = useState<GameState>(defaultGameState);
    const playerTurn = useRef<PlayerTurn>('X');     
    const [whoWon, setwhoWon] = useState<PlayerTurn | null>(null);   
    const [scoreX, setscoreX] = useState(0);
    const [scoreO, setscoreO] = useState(0);
    const [inroom, setInroom] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<string>();

    const handleBoxChange = (boxIndex:number) => {
        const newGameState = gameState.map((element, index) => {
            return index === boxIndex ? playerTurn.current : element;
        })
        
        socket.emit('updateGameState', {roomCode, newGameState, playerTurn, whoWon});

        setGameState(newGameState);

        if(checkWin(newGameState, playerTurn.current)){
            setwhoWon(playerTurn.current)
            if(playerTurn.current === "X"){
                setscoreX(scoreX + 1);
            }
            else {
                setscoreO(scoreO + 1);
            }
        }
    
        playerTurn.current = playerTurn.current === 'X' ? 'O' : 'X';
    }
    
    const checkWin = (gameState:GameState, playerTurn:PlayerTurn) => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return gameState[index] === playerTurn 
                
            })
        })
    }

    const restartGame = () => {
        setGameState(defaultGameState);
        setwhoWon(null);
    }

    const CreateRoom = () => {
        setInroom(true);
        const randroomcode = (Math.round(Math.random() * (90000 - 10000) + 10000).toString());
        setRoomCode(randroomcode);
        socket.emit('join_room', randroomcode)
    }

    const JoinRoom = () => {
        if(roomCode !== '' ){
            socket.emit('join_room', roomCode)
            setInroom(true)
        }
    }

    useEffect(() => {
        setwhoWon(null)
    }, [])

    useEffect(() => {
        socket.on('retGameState', (data) => {
            setGameState(data.receiveNewGameState);
            setwhoWon(data.receiveWhoWon)
            // playerTurn.current = data.receivePlayerTurn;
        })
    }, [socket])
    return (
        <>
        <div className='btn-exit'>
        <Link className='link-exit' to="/" >Home</Link>
        </div>
        
        {!inroom && <div className='main-container-room' >
            <div className='rooms-t' >Rooms</div>
            <button onClick={CreateRoom} className='btn-join-create' >Create Room</button>
            <br />
            <input onChange={(input) => {setRoomCode(input.target.value)}} className='input-room' type='text' />
            <button onClick={JoinRoom} className='btn-join-create' >Join Room</button>
        </div>}
        {inroom && <div className='main-container-game'>
            <div className='scoreboard'>
                <div className='score-ind X-class' >{`X ${scoreX}`}</div>
                <div className='score-ind O-class' >{`O ${scoreO}`}</div>
            </div>
            <div className='playerturn-div'>
                <div className='playerturn' ><span className='pt' >{playerTurn.current}</span> Turn</div>
            </div>
            <div className='game'>
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(0)} value={gameState[0]} />
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(1)} value={gameState[1]} />
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(2)} value={gameState[2]} />
                
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(3)} value={gameState[3]} />
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(4)} value={gameState[4]} />
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(5)} value={gameState[5]} />
                
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(6)} value={gameState[6]} />
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(7)} value={gameState[7]} />
                <XoBox whoWon={whoWon} onChange={() => handleBoxChange(8)} value={gameState[8]} />
            </div>
            <div className='new-game' >
                <button onClick={() => restartGame()} className="new-game-btn" >NEW GAME</button>
            </div>
            {whoWon && <div className='who-won'>{`User ${whoWon} won!`}</div>}
            <div className='code-room' >Code Room : {roomCode}</div>
        </div>}
        </>       
    )
}

export default Multiplayer