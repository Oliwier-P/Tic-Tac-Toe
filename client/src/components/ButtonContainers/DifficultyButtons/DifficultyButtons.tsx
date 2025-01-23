import { Button } from "../../Button/Button";
import "./DifficultyButtonsStyle.scss";

export function DifficultyButtons() {
  return (
    <div className="difficulty_container flex">
      <Button text="Easy" width="180px" fontSize="1.5rem" onClick={() => {}} />
      <Button text="Medium" width="180px" fontSize="1.5rem" onClick={() => {}} />
      <Button text="Hard" width="180px" fontSize="1.5rem" onClick={() => {}} />
    </div>
  );
}
