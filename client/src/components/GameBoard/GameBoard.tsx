import { Box } from "../Box/GameBox/Box";
import "./GameBoardStyle.scss";

export function GameBoard() {
  return (
    <div className="game_board flex">
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
      <Box />
    </div>
  );
}
