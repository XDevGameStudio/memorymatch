import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';
import { getBestMove } from './aiUtils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

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
  const [isXNext, setIsXNext] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const { winner, line } = calculateWinner(squares);

  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;

  useEffect(() => {
    if (!isXNext && !winner && !isDraw) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(squares, difficulty);
        const newSquares = squares.slice();
        newSquares[aiMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, squares, winner, isDraw, difficulty]);

  useEffect(() => {
    if (winner) {
      if (winner === 'X') {
        setWins(prev => prev + 1);
      } else if (winner === 'O') {
        setLosses(prev => prev + 1);
      }
    }
  }, [winner]);

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

  const resetEverything = () => {
    resetGame();
    setWins(0);
    setLosses(0);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-[#F1F0FB]">
      <div className="flex flex-col items-center gap-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Select Difficulty</h2>
        <RadioGroup
          defaultValue={difficulty}
          onValueChange={(value) => setDifficulty(value as 'easy' | 'medium' | 'hard')}
          className="flex gap-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="easy" id="easy" />
            <Label htmlFor="easy">Easy</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="medium" id="medium" />
            <Label htmlFor="medium">Medium</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="hard" id="hard" />
            <Label htmlFor="hard">Hard</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="flex gap-8 text-lg font-semibold mb-4">
        <div className="flex flex-col items-center">
          <span className="text-green-600">Wins</span>
          <span className="text-2xl">{wins}</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-red-600">Losses</span>
          <span className="text-2xl">{losses}</span>
        </div>
      </div>

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
      <Button 
        variant="outline"
        onClick={resetEverything}
        className="mt-4"
      >
        Reset Everything
      </Button>
    </div>
  );
};

export default Game;