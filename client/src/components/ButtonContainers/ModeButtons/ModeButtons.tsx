import { Button } from "../../Button/Button";
import "./ModeButtonsStyle.scss";

export function ModeButtons() {
  return (
    <div className="mode_container flex">
      <Button
        text={"Player vs Player"}
        width="200px"
        fontSize="1rem"
        onClick={() => {}}
      />
      <Button text="Player vs AI" width="200px" fontSize="1rem" onClick={() => {}} />
    </div>
  );
}
