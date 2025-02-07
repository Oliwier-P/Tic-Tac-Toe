import "./ScoreboardStyle.scss";

import { ScoreboardType } from "../../types/ScoreboardType";

import { Box } from "../Box/InfoBox/Box";
import { GameModeType } from "../../types/GameModeType";

type ScoreboardProps = {
  roomCode: number | null;
  scoreboard: ScoreboardType;
  mode: GameModeType;
};

export function Scoreboard({ roomCode, scoreboard, mode }: ScoreboardProps) {
  const CopyRoom = () => {
    navigator.clipboard.writeText(`${roomCode!}`);
  };

  return (
    <div className="scoreboard flex">
      <div className="roomCode flex" onClick={CopyRoom}>
        Code: {roomCode}
      </div>
      <Box info="X (You)" value={`${scoreboard.X}`} />
      <Box info="Draw" value={`${scoreboard.draws}`} />
      <Box info={`O (${mode == "AI" ? "AI" : "Player"})`} value={`${scoreboard.O}`} />
    </div>
  );
}
