import { Box } from "../Box/GameBox/Box";
import "./GameBoardStyle.scss";

type GameboardProps = {
  gameboard: string[];
  onClick: (index: number) => void;
};

export function GameBoard({ gameboard, onClick }: GameboardProps) {
  return (
    <div className="game_board">
      {gameboard.map((box, index) => (
        <Box key={index} value={box} onClick={() => onClick(index)} />
      ))}
    </div>
  );
}
