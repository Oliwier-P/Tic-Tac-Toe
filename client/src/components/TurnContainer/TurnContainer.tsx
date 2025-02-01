import "./TurnContainerStyle.scss";

import { Box } from "../Box/InfoBox/Box";
import { Reset } from "./Reset/Reset";

type TurnContainerProps = {
  turn: string;
  mode: "ONLINE" | "AI";
};

export function TurnContainer({ turn, mode }: TurnContainerProps) {
  return (
    <div className="turn_container flex">
      <Box info="Turn" value={turn} />
      {mode == "ONLINE" && <Reset onClick={() => {}} />}
    </div>
  );
}
