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
    const [scoreX, setScoreX] = useState(0);
    const [scoreO, setScoreO] = useState(0);
    const [inroom, setInroom] = useState<boolean>(false);
    const [roomCode, setRoomCode] = useState<string>();

    // click box
    const handleBoxChange = (boxIndex:number) => {
        const newGameState = gameState.map((element, index) => {
            return index === boxIndex ? playerTurn.current : element;
        })
        
        const Turn = playerTurn.current === 'X' ? 'O' : 'X';

        socket.emit('updateGameState', {roomCode, newGameState, Turn, whoWon});

        setGameState(newGameState);

        if(checkWin(newGameState, playerTurn.current)){
            setwhoWon(playerTurn.current)
            if(playerTurn.current === "X"){
                setScoreX(scoreX + 1);
            }
            else {
                setScoreO(scoreO + 1);
            }
        }
    }
    
    // check win
    const checkWin = (gameState:GameState, playerTurns:PlayerTurn) => {
        return WINNING_COMBINATIONS.some(combination => {
            return combination.every(index => {
                return gameState[index] === playerTurns 
                
            })
        })
    }

    // restart game, clear board and start new game
    const restartGame = () => {
        setGameState(defaultGameState);
        setwhoWon(null);
    }

    // create room
    const CreateRoom = () => {
        setInroom(true);
        const randroomcode = (Math.round(Math.random() * (90000 - 10000) + 10000).toString());
        setRoomCode(randroomcode);
        socket.emit('join_room', randroomcode)
    }

    // join room
    const JoinRoom = () => {
        if(roomCode !== '' ){
            socket.emit('join_room', roomCode)
            setInroom(true)
        }
    }

    useEffect(() => {
        socket.on('retGameState', (data) => {
            setGameState(data.receiveNewGameState);
            setwhoWon(data.receiveWhoWon);
            console.log(data.receiveTurn);
        })
    }, [])

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
                {gameState.map((value, index) => (
                    <XoBox
                        key={index}
                        whoWon={whoWon}
                        onChange={() => handleBoxChange(index)}
                        value={value}
                    />
                ))}
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