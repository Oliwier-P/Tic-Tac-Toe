import "./ScoreboardStyle.scss";

import { ScoreboardType } from "../../types/ScoreboardType";

import { Box } from "../Box/InfoBox/Box";

type ScoreboardProps = {
  roomCode: number | null;
  scoreboard: ScoreboardType;
};

export function Scoreboard({ roomCode, scoreboard }: ScoreboardProps) {
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
      <Box info="O (???)" value={`${scoreboard.O}`} />
    </div>
  );
}
