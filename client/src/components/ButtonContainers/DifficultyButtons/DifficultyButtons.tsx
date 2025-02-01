import "./DifficultyButtonsStyle.scss";

import { useNavigate } from "react-router-dom";

import { Button } from "../../Button/Button";

export function DifficultyButtons() {
  const navigate = useNavigate();

  const handleStartGame = (difficulty: string) => {
    navigate("/game", {
      state: { gameMode: "AI", difficulty: difficulty, currentTurn: "X" },
    });
  };

  return (
    <div className="difficulty_container flex">
      <Button
        text="Easy"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("EASY")}
      />
      <Button
        text="Medium"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("MEDIUM")}
      />
      <Button
        text="Hard"
        width="180px"
        fontSize="1rem"
        onClick={() => handleStartGame("HARD")}
      />
    </div>
  );
}
