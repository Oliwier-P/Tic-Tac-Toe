import "./DifficultyButtonsStyle.scss";

import { useNavigate } from "react-router-dom";

import { Button } from "../../Button/Button";

export function DifficultyButtons() {
  const navigate = useNavigate();

  const handleStartGame = (mode: string) => {
    navigate("/game");
  };

  return (
    <div className="difficulty_container flex">
      <Button
        text="Easy"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("easy")}
      />
      <Button
        text="Medium"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("medium")}
      />
      <Button
        text="Hard"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("hard")}
      />
    </div>
  );
}
