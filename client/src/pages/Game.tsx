import "./PageStyles.scss";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

import { ScoreboardType } from "../types/ScoreboardType";
import { GameDataType } from "../types/GameDataType";
import { TurnType } from "../types/TurnType";

import { Header } from "../components/Header/Header";
import { GameBoard } from "../components/GameBoard/GameBoard";
import { TurnContainer } from "../components/TurnContainer/TurnContainer";
import { Scoreboard } from "../components/Scoreboard/Scoreboard";
import { Lobby } from "../components/Lobby/Lobby";
import { EndGame } from "../components/EndGame/EndGame";

import { socket } from "../socket";

const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6], // Diagonal from top-right
];

export function Game() {
  const navigate = useNavigate();
  const location = useLocation();

  const gameMode = location.state?.gameMode || null;
  const difficulty = location.state?.difficulty || null;
  const [currentTurn, setCurrentTurn] = useState<string | null>(
    location.state?.currentTurn || null
  );

  const [scoreboard, setScoreboard] = useState<ScoreboardType>({ X: 0, O: 0, draws: 0 });
  const [gameData, setGameData] = useState<GameDataType>({
    roomCode: null,
    status: gameMode == "AI" ? "GAME" : "WAIT",
    turn: "X",
  });
  const [gameboard, setGameboard] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [winningSpots, setWinningSpots] = useState<number[] | null>([]);
  const [winner, setWinner] = useState<TurnType | null>(null);

  const updateGameData = async (boxId: number, boxSign: TurnType, turn: TurnType) => {
    setGameData((prev) => ({ ...prev, turn: turn }));
    setGameboard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[boxId] = boxSign;
      return newBoard;
    });
  };

  const newGame = (newTurn: TurnType, spots: number[] | null) => {
    setWinningSpots(() => spots ?? []);

    setTimeout(() => {
      setGameboard(() => ["", "", "", "", "", "", "", "", ""]);
      setGameData((prevData) => ({ ...prevData, turn: newTurn }));
      setWinningSpots(() => []);
      setWinner(() => null);
    }, 2000);
  };

  const checkWinner = (
    board: string[]
  ): { winner: TurnType | null; spots: number[] | null } => {
    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as TurnType, spots: [a, b, c] };
      }
    }
    return { winner: null, spots: null };
  };

  const difficultyMoveAI = () => {
    const emptySpots = gameboard.reduce<number[]>(
      (acc, value, index) => (value === "" ? [...acc, index] : acc),
      []
    );

    const randomIndex = Math.floor(Math.random() * emptySpots.length);

    const winOrBlock = () => {
      // Check if AI can win in the next move
      for (let move of emptySpots) {
        const tempBoard = [...gameboard];

        tempBoard[move] = "O";

        if (checkWinner(tempBoard).winner === "O") {
          return move;
        }
      }

      // Check if the player ("X") is about to win, and block
      for (let move of emptySpots) {
        const tempBoard = [...gameboard];

        tempBoard[move] = "X";

        if (checkWinner(tempBoard).winner === "X") {
          return move;
        }
      }
    };

    const minimax = (board: string[], depth: number, isMaximizing: boolean): number => {
      const { winner } = checkWinner(board);
      if (winner == "O") return 10 - depth;
      if (winner == "X") return depth - 10;
      if (board.every((cell) => cell !== "")) return 0;

      // AI turn
      if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, depth + 1, false);
            board[i] = "";
            bestScore = Math.max(bestScore, score);
          }
        }
        return bestScore;
      }
      // Player Turn
      else {
        let worstScore = Infinity;
        for (let i = 0; i < board.length; i++) {
          if (board[i] === "") {
            board[i] = "X";
            let score = minimax(board, depth + 1, true);
            board[i] = "";
            worstScore = Math.min(worstScore, score);
          }
        }
        return worstScore;
      }
    };

    switch (difficulty) {
      case "EASY":
        // Make random move
        return emptySpots[randomIndex];
      case "MEDIUM":
        const moveWinOrBlock = winOrBlock();

        if (moveWinOrBlock) return moveWinOrBlock;

        // Otherwise make random move
        return emptySpots[randomIndex];
      case "HARD":
        let bestMove = -1;
        let bestScore = -Infinity;

        for (let i = 0; i < gameboard.length; i++) {
          if (gameboard[i] === "") {
            gameboard[i] = "O"; // AI makes a move
            let score = minimax(gameboard, 0, false);
            gameboard[i] = ""; // Undo move

            if (score > bestScore) {
              bestScore = score;
              bestMove = i;
            }
          }
        }

        return bestMove;
      default:
        return 0;
    }
  };

  const moveAI = async () => {
    const selectedSpot: number = difficultyMoveAI();

    setGameboard((prevBoard) => {
      const newBoard = [...prevBoard];
      newBoard[selectedSpot] = "O";
      return newBoard;
    });
  };

  const handleHome = () => {
    socket.disconnect();
    navigate("/");
  };

  const handleMove = async (id: number) => {
    if (gameboard[id] !== "" || gameData.turn !== currentTurn || winner) return;

    const newTurn = gameData.turn == "X" ? "O" : "X";

    if (gameMode === "AI") {
      await updateGameData(id, gameData.turn, newTurn);
    } else {
      socket.emit("update_gamedata", gameData.roomCode, id, currentTurn, newTurn);
    }
  };

  useEffect(() => {
    if (gameMode == "AI") return;

    socket.emit("check_connection", (status: boolean, code: number | null) => {
      if (!status) {
        handleHome();
      } else {
        setGameData((prev) => ({ ...prev, roomCode: code }));
      }
    });
  }, []);

  useEffect(() => {
    socket.on("game_status", (response: "END" | "GAME" | "WAIT") => {
      setGameData((prev) => ({ ...prev, status: response }));
    });

    socket.on("receive_gamedata", (id: number, sign: TurnType, turn: "X" | "O") => {
      updateGameData(id, sign, turn);
    });

    socket.on("receive_new_game", (newTurn: TurnType, spots: number[] | null) => {
      newGame(newTurn, spots);
    });
  }, [socket]);

  useEffect(() => {
    const result = checkWinner(gameboard);
    const isDraw: boolean = gameboard.every((box) => box !== "");

    setWinner(() => result.winner);

    if (result.winner || isDraw) {
      const key: keyof ScoreboardType = result.winner ? result.winner : "draws";

      setScoreboard((prevScore) => ({
        ...prevScore,
        [key]: prevScore[key] + 1,
      }));

      if (gameMode === "AI") {
        newGame("X", result.spots);
      } else if (currentTurn === "X") {
        const newTurn = result.winner === "X" ? "O" : "X";
        socket.emit("new_game", gameData.roomCode, newTurn, result.spots);
      }
    } else if (gameMode === "AI" && gameData.turn === "O") {
      setTimeout(() => {
        moveAI().then(() => {
          setGameData((prev) => ({ ...prev, turn: "X" }));
        });
      }, 1000);
    }
  }, [gameboard]);

  return (
    <>
      <Header onClick={handleHome} />
      <div className="game_container flex">
        {gameData.status == "END" ? (
          <EndGame onClick={handleHome} />
        ) : (
          <>
            <Scoreboard
              roomCode={gameData.roomCode}
              scoreboard={scoreboard}
              mode={gameMode}
            />
            <div className="game_sub_container flex">
              {gameData.status == "GAME" && (
                <>
                  <TurnContainer turn={gameData.turn} mode={gameMode} />
                  <GameBoard
                    gameboard={gameboard}
                    onClick={handleMove}
                    winningSpots={winningSpots}
                  />
                </>
              )}
              {gameData.status == "WAIT" && <Lobby />}
            </div>
          </>
        )}
      </div>
    </>
  );
}
