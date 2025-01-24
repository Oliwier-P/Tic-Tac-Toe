import "./PageStyles.scss";

import { useNavigate } from "react-router-dom";

import { Header } from "../components/Header/Header";
import { GameBoard } from "../components/GameBoard/GameBoard";
import { TurnContainer } from "../components/TurnContainer/TurnContainer";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";

export function Game() {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <>
      <Header onClick={handleHome} />
      <div className="game_container flex">
        <TurnContainer />
        <div className="game_sub_container flex">
          <GameBoard />
        </div>
      </div>
    </>
  );
}
