import "./TurnContainerStyle.scss";

import { Box } from "../Box/InfoBox/Box";
import { Reset } from "./Reset/Reset";

type TurnContainerProps = {
  turn: string;
};

export function TurnContainer({ turn }: TurnContainerProps) {
  return (
    <div className="turn_container flex">
      <Box info="Turn" value={turn} />
      <Reset onClick={() => {}} />
    </div>
  );
}
