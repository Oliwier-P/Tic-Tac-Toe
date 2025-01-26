import "./PageStyles.scss";

import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { GameBoard } from "../components/GameBoard/GameBoard";
import { TurnContainer } from "../components/TurnContainer/TurnContainer";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { useState } from "react";

export function Game() {
  // solo or onilne
  const [mode, setMode] = useState<string>("SOLO");

  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header onClick={handleHome} />
      <div className="game_container flex">
        <Scoreboard />
        <div className="game_sub_container flex">
          <TurnContainer />
          <GameBoard />
        </div>
      </div>
    </>
  );
}
