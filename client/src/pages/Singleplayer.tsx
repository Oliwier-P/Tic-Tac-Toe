import React, { useEffect, useRef, useState } from 'react'
import XoBox from '../components/XoBox'
import { GameState , PlayerTurn } from '../types';
import io from 'socket.io';
import { Link } from 'react-router-dom';

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

function Singleplayer() {
    const defaultGameState:GameState = ['','','','','','','','',''];
    const [gameState, setGameState] = useState<GameState>(defaultGameState);
    const playerTurn = useRef<PlayerTurn>('X');     
    const [whoWon, setwhoWon] = useState<PlayerTurn | null>(null);   
    let [scoreX, setscoreX] = useState(0);
    const [scoreO, setscoreO] = useState(0);

    useEffect(() => {
        setwhoWon(null)
    }, [])

    const handleBoxChange = (boxIndex:number) => {
        const newGameState = gameState.map((element, index) => {
            return index === boxIndex ? playerTurn.current : element;
        })
        
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

    return (
        <>
        <div className='btn-exit'>
        <Link className='link-exit' to="/" >Home</Link>
        </div>
        <div className='main-container-game'>
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
        </div>
        </>       
    )
}

export default Singleplayer