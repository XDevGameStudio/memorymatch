import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';
import { getBestMove } from './aiUtils';

const calculateWinner = (squares: (string | null)[]): { winner: string | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
};

const Game = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Player is X, AI is O
  const { winner, line } = calculateWinner(squares);

  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;

  useEffect(() => {
    // AI's turn
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(squares);
        const newSquares = squares.slice();
        newSquares[aiMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }, 500); // Add a small delay to make AI moves feel more natural

      return () => clearTimeout(timer);
    }
  }, [isXNext, squares, winner, isDraw]);

  const handleClick = (i: number) => {
    if (winner || squares[i] || !isXNext) return;

    const newSquares = squares.slice();
    newSquares[i] = 'X';
    setSquares(newSquares);
    setIsXNext(false);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-[#F1F0FB]">
      <Board
        squares={squares}
        winningLine={line}
        onClick={handleClick}
      />
      <GameStatus
        winner={winner}
        isDraw={isDraw}
        isXNext={isXNext}
        onReset={resetGame}
      />
    </div>
  );
};

export default Game;