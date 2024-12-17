import React, { useState, useEffect } from 'react';
import Board from './Board';
import GameStatus from './GameStatus';
import { getBestMove } from './aiUtils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { Moon, Sun } from "lucide-react"
import { useTheme } from 'next-themes';

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
  const [vsAI, setVsAI] = useState(true);
  const { theme, setTheme } = useTheme();
  const { winner, line } = calculateWinner(squares);

  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;

  useEffect(() => {
    if (!isXNext && !winner && !isDraw && vsAI) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(squares, difficulty);
        const newSquares = squares.slice();
        newSquares[aiMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, squares, winner, isDraw, difficulty, vsAI]);

  useEffect(() => {
    if (winner && vsAI) {
      if (winner === 'X') {
        setWins(prev => prev + 1);
      } else if (winner === 'O') {
        setLosses(prev => prev + 1);
      }
    }
  }, [winner, vsAI]);

  const handleClick = (i: number) => {
    if (winner || squares[i] || (!isXNext && vsAI)) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
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
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      >
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>

      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-lg font-medium">Game Mode</h2>
          <RadioGroup
            defaultValue={vsAI ? "ai" : "player"}
            onValueChange={(value) => setVsAI(value === "ai")}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="ai" id="ai" />
              <Label htmlFor="ai">vs AI</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="player" id="player" />
              <Label htmlFor="player">vs Player</Label>
            </div>
          </RadioGroup>
        </div>

        {vsAI && (
          <div className="flex flex-col items-center gap-4">
            <h2 className="text-lg font-medium">AI Difficulty</h2>
            <div className="flex gap-2">
              {['easy', 'medium', 'hard'].map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                  className="capitalize"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        )}

        {vsAI && (
          <div className="flex gap-8 text-lg">
            <div className="flex flex-col items-center">
              <span className="text-primary">Wins</span>
              <span className="text-2xl font-medium">{wins}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-primary">Losses</span>
              <span className="text-2xl font-medium">{losses}</span>
            </div>
          </div>
        )}

        <div className="text-xl font-medium mb-4">
          {!winner && !isDraw && (
            <div className="flex items-center gap-2">
              Turn: <span className="font-bold">{isXNext ? 'X' : 'O'}</span>
            </div>
          )}
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

        {vsAI && (
          <Button 
            variant="outline"
            onClick={resetEverything}
          >
            Reset Everything
          </Button>
        )}
      </div>
    </div>
  );
};

export default Game;