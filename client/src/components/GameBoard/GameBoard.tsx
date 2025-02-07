import "./GameBoardStyle.scss";

import { Box } from "../Box/GameBox/Box";

type GameboardProps = {
  gameboard: string[];
  winningSpots: number[] | null;
  onClick: (index: number) => void;
};

export function GameBoard({ gameboard, winningSpots, onClick }: GameboardProps) {
  return (
    <div className="game_board">
      {gameboard.map((box, index) => (
        <Box
          key={index}
          value={box}
          animation={winningSpots!.includes(index)}
          onClick={() => onClick(index)}
        />
      ))}
    </div>
  );
}
