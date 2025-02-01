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

  const handleHome = () => {
    socket.disconnect();
    navigate("/");
  };

  const handleMove = (id: number) => {
    if (gameboard[id] !== "" || gameData.turn !== currentTurn) return;

    // check win

    const newTurn = gameData.turn == "X" ? "O" : "X";

    socket.emit("change_turn", gameData.roomCode, newTurn);
    socket.emit("update_gameboard", gameData.roomCode, id, currentTurn);
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
    socket.on("receive_turn", (turn: string) => {
      setGameData((prev) => ({ ...prev, turn: turn }));
    });
    socket.on("receive_gameboard", (id: number, sign: string) => {
      setGameboard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[id] = sign;
        return newBoard;
      });
    });
  }, [socket]);

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
