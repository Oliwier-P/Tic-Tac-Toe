import "./DifficultyButtonsStyle.scss";

import { useNavigate } from "react-router-dom";

import { Button } from "../../Button/Button";

export function DifficultyButtons() {
  const navigate = useNavigate();

  const handleStartGame = (mode: string, difficulty: string) => {
    navigate("/game", { state: { gameMode: mode, difficulty: difficulty } });
  };

  return (
    <div className="difficulty_container flex">
      <Button
        text="Easy"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("AI", "EASY")}
      />
      <Button
        text="Medium"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("AI", "MEDIUM")}
      />
      <Button
        text="Hard"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("AI", "HARD")}
      />
    </div>
  );
}
