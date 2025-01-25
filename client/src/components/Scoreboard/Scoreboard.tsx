import { Box } from "../Box/InfoBox/Box";
import "./ScoreboardStyle.scss";

export function Scoreboard() {
  return (
    <div className="scoreboard flex">
      <Box info="X (You)" value="7" />
      <Box info="Draw" value="2" />
      <Box info="O (???)" value="5" />
    </div>
  );
}
