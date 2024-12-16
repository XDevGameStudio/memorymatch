import React, { useState } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';

const calculateWinner = (squares: (string | null)[]): { winner: string | null; line: number[] | null } => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6] // diagonals
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
  const [isXNext, setIsXNext] = useState(true);
  const { winner, line } = calculateWinner(squares);

  const handleClick = (i: number) => {
    if (winner || squares[i]) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <Board
        squares={squares}
        winningLine={line}
        onClick={handleClick}
      />
      <GameStatus
        winner={winner}
        isXNext={isXNext}
        onReset={resetGame}
      />
    </div>
  );
};

export default Game;