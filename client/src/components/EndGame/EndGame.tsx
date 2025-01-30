import "./EndGameStyle.scss";

import { Button } from "../Button/Button";

type EndGameProps = {
  onClick: () => void;
};

export function EndGame({ onClick }: EndGameProps) {
  return (
    <div className="end_container flex">
      <span>Host left the game</span>
      <Button text="Leave" width="150px" fontSize="1.5rem" onClick={onClick} />
    </div>
  );
}
