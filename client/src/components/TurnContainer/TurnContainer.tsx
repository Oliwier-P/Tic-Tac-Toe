import "./TurnContainerStyle.scss";

import { Box } from "../Box/InfoBox/Box";
import { Reset } from "./Reset/Reset";

export function TurnContainer() {
  return (
    <div className="turn_container flex">
      <Box info="Turn" value="O" />
      <Reset onClick={() => {}} />
    </div>
  );
}
