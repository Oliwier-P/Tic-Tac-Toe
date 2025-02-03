import "./PageStyles.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ScoreboardType } from "../types/ScoreboardType";
import { GameDataType } from "../types/GameDataType";
import { TurnType } from "../types/TurnType";

import { Header } from "../components/Header/Header";
import { GameBoard } from "../components/GameBoard/GameBoard";
import { TurnContainer } from "../components/TurnContainer/TurnContainer";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { Lobby } from "../components/Lobby/Lobby";
import { EndGame } from "../components/EndGame/EndGame";

import { socket } from "../socket";

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6], // Diagonal from top-right
];

export function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  const gameMode = location.state?.gameMode || null;
  const difficulty = location.state?.difficulty || null;
  const [currentTurn, setCurrentTurn] = useState<string | null>(
    location.state?.currentTurn || null
  );

  const [scoreboard, setScoreboard] = useState<ScoreboardType>({ X: 0, O: 0, draws: 0 });
  const [gameData, setGameData] = useState<GameDataType>({
    roomCode: null,
    status: gameMode == "AI" ? "GAME" : "WAIT",
    turn: "X",
  });
  const [gameboard, setGameboard] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const checkWinner = (board: string[]): TurnType | null => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as TurnType;
      }
    }
    return null;
  };

  const handleHome = () => {
    socket.disconnect();
    navigate("/");
  };

  const handleMove = (id: number) => {
    if (gameboard[id] !== "" || gameData.turn !== currentTurn) return;

    const newTurn = gameData.turn == "X" ? "O" : "X";

    socket.emit("update_gamedata", gameData.roomCode, id, currentTurn, newTurn);
  };

  useEffect(() => {
    if (gameMode == "AI") return;

    socket.emit("check_connection", (status: boolean, code: number | null) => {
      if (!status) {
        handleHome();
      } else {
        setGameData((prev) => ({ ...prev, roomCode: code }));
      }
    });
  }, []);

  useEffect(() => {
    socket.on("game_status", (response: "END" | "GAME" | "WAIT") => {
      setGameData((prev) => ({ ...prev, status: response }));
    });

    socket.on("receive_gamedata", (id: number, sign: string, turn: "X" | "O") => {
      setGameData((prev) => ({ ...prev, turn: turn }));
      setGameboard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[id] = sign;
        return newBoard;
      });
    });

    socket.on("receive_new_game", (newTurn: "X" | "O") => {
      // gamevboard
      setGameboard(() => ["", "", "", "", "", "", "", "", ""]);
      // gamedata
      setGameData((prevData) => ({ ...prevData, turn: newTurn }));
      // update scoreboard
    });
  }, [socket]);

  useEffect(() => {
    const gameWinner: TurnType | null = checkWinner(gameboard);
    const isDraw: boolean = gameboard.every((box) => box !== "");

    if (gameWinner || isDraw) {
      const key: keyof ScoreboardType = gameWinner ? gameWinner : "draws";

      setScoreboard((prevScore) => ({
        ...prevScore,
        [key]: prevScore[key] + 1,
      }));

      if (currentTurn === "X") {
        const newTurn = gameWinner === "X" ? "O" : "X";
        socket.emit("new_game", gameData.roomCode, newTurn);
      }
    }
  }, [gameboard]);

  return (
    <>
      <Header onClick={handleHome} />
      <div className="game_container flex">
        {gameData.status == "END" ? (
          <EndGame onClick={handleHome} />
        ) : (
          <>
            <Scoreboard roomCode={gameData.roomCode} scoreboard={scoreboard} />
            <div className="game_sub_container flex">
              {gameData.status == "GAME" && (
                <>
                  <TurnContainer turn={gameData.turn} mode={gameMode} />
                  <GameBoard gameboard={gameboard} onClick={handleMove} />
                </>
              )}
              {gameData.status == "WAIT" && <Lobby />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
