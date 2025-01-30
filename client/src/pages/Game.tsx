import "./PageStyles.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ScoreboardType } from "../types/ScoreboardType";
import { GameDataType } from "../types/GameDataType";

import { Header } from "../components/Header/Header";
import { GameBoard } from "../components/GameBoard/GameBoard";
import { TurnContainer } from "../components/TurnContainer/TurnContainer";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { Lobby } from "../components/Lobby/Lobby";
import { EndGame } from "../components/EndGame/EndGame";

import { socket } from "../socket";

export function Game() {
  const [gameData, setGameData] = useState<GameDataType>({
    roomCode: null,
    status: "END",
    turn: "O",
  });
  const [scoreboard, setScoreboard] = useState<ScoreboardType>({ X: 0, O: 0, draws: 0 });

  const navigate = useNavigate();

  const handleHome = () => {
    socket.disconnect();
    navigate("/");
  };

  useEffect(() => {
    socket.emit("check_connection", (status: boolean, code: number | null) => {
      if (!status) {
        handleHome();
      } else {
        setGameData((prev) => ({ ...prev, roomCode: code }));
      }
    });
  }, []);

  useEffect(() => {
    socket.on("host_left", (response: string) => {
      setGameData((prev) => ({ ...prev, status: "END" }));
    });
    socket.on("user_left", (response: string) => {
      setGameData((prev) => ({ ...prev, status: "WAIT" }));
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
                  <TurnContainer turn={gameData.turn} />
                  <GameBoard />
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
