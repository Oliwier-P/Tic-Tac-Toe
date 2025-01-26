import "./TurnContainerStyle.scss";

import { Box } from "../Box/TurnBox/Box";
import { Reset } from "./Reset/Reset";

export function TurnContainer() {
  return (
    <div className="turn_container flex">
      <Box />
      <Reset onClick={() => {}} />
    </div>
  );
}
