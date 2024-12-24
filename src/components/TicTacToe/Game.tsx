import React, { useState, useEffect } from 'react';
import Board from './Board';
import { getBestMove } from './aiUtils';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Moon, Sun, HelpCircle } from "lucide-react"
import { useTheme } from '@/hooks/use-theme';
import StartScreen from './StartScreen';
import WinnerDialog from './WinnerDialog';
import GameControls from './GameControls';
import PlayerStats from './PlayerStats';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

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
  const [vsAI, setVsAI] = useState<boolean | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const { theme, setTheme } = useTheme();
  const { winner, line } = calculateWinner(squares);

  const isBoardFull = squares.every(square => square !== null);
  const isDraw = !winner && isBoardFull;

  useEffect(() => {
    if (!isXNext && !winner && !isDraw && vsAI && !isPaused) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(squares, difficulty);
        const newSquares = squares.slice();
        newSquares[aiMove] = 'O';
        setSquares(newSquares);
        setIsXNext(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [isXNext, squares, winner, isDraw, difficulty, vsAI, isPaused]);

  useEffect(() => {
    if (winner || isDraw) {
      setShowWinnerDialog(true);
    }
  }, [winner, isDraw]);

  useEffect(() => {
    if (winner) {
      if ((vsAI && winner === 'X') || (!vsAI && winner === 'X')) {
        setWins(prev => prev + 1);
      } else {
        setLosses(prev => prev + 1);
      }
    }
  }, [winner, vsAI]);

  const handleClick = (i: number) => {
    if (winner || squares[i] || (!isXNext && vsAI) || isPaused) return;

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
    setShowWinnerDialog(false);
    setIsPaused(false);
  };

  const resetEverything = () => {
    resetGame();
    setWins(0);
    setLosses(0);
  };

  const handleStartGame = (againstAI: boolean) => {
    setVsAI(againstAI);
    resetEverything();
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleHome = () => {
    setVsAI(null);
    resetEverything();
  };

  if (vsAI === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="rounded-none"
            onClick={() => {
              const dialog = document.createElement('dialog');
              dialog.innerHTML = `
                <div class="p-4">
                  <h2 class="text-lg font-bold mb-2">How to Play Tic Tac Toe X</h2>
                  <ol class="list-decimal pl-4">
                    <li>Choose to play against AI or another player</li>
                    <li>Take turns placing X's and O's on the board</li>
                    <li>Get three in a row to win</li>
                    <li>Block your opponent from getting three in a row</li>
                    <li>Have fun!</li>
                  </ol>
                  <button class="mt-4 px-4 py-2 bg-primary text-primary-foreground" onclick="this.parentElement.parentElement.close()">Close</button>
                </div>
              `;
              dialog.className = "p-4 rounded-none bg-background text-foreground";
              document.body.appendChild(dialog);
              dialog.showModal();
              dialog.addEventListener('close', () => {
                document.body.removeChild(dialog);
              });
            }}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-none">
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("candy")}>Candy</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("sunset")}>Sunset</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("forest")}>Forest</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <StartScreen onStart={handleStartGame} />
        <div className="fixed bottom-4 right-4">
          <p className="text-sm text-muted-foreground">created by x dev</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <div className="absolute top-4 right-4 flex gap-2">
        <Button
          variant="outline"
          size="icon"
          className="rounded-none"
          onClick={() => {
            const dialog = document.createElement('dialog');
            dialog.innerHTML = `
              <div class="p-4">
                <h2 class="text-lg font-bold mb-2">How to Play Tic Tac Toe X</h2>
                <ol class="list-decimal pl-4">
                  <li>Choose to play against AI or another player</li>
                  <li>Take turns placing X's and O's on the board</li>
                  <li>Get three in a row to win</li>
                  <li>Block your opponent from getting three in a row</li>
                  <li>Have fun!</li>
                </ol>
                <button class="mt-4 px-4 py-2 bg-primary text-primary-foreground" onclick="this.parentElement.parentElement.close()">Close</button>
              </div>
            `;
            dialog.className = "p-4 rounded-none bg-background text-foreground";
            document.body.appendChild(dialog);
            dialog.showModal();
            dialog.addEventListener('close', () => {
              document.body.removeChild(dialog);
            });
          }}
        >
          <HelpCircle className="h-4 w-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-none">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("candy")}>Candy</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("sunset")}>Sunset</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("forest")}>Forest</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col items-center gap-8 w-full max-w-[300px]">
        <h1 className="text-4xl font-bold">Tic Tac Toe X</h1>
        
        <div className="flex flex-col items-center gap-4 w-full">
          <h2 className="text-lg font-medium">Game Mode</h2>
          <RadioGroup
            defaultValue={vsAI ? "ai" : "player"}
            onValueChange={(value) => {
              setVsAI(value === "ai");
              resetEverything();
            }}
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
          <div className="flex flex-col items-center gap-4 w-full">
            <h2 className="text-lg font-medium">AI Difficulty</h2>
            <div className="grid grid-cols-3 gap-2 w-full">
              {['easy', 'medium', 'hard'].map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                  className="capitalize w-full rounded-none"
                >
                  {level}
                </Button>
              ))}
            </div>
          </div>
        )}

        <PlayerStats wins={wins} losses={losses} vsAI={vsAI} />

        <div className="text-xl font-medium mb-4">
          {!winner && !isDraw && !isPaused && (
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-2">
              Turn: <span className="font-bold">{isXNext ? 'X' : 'O'}</span>
            </div>
          )}
          {isPaused && (
            <div className="flex items-center gap-2 bg-primary/5 px-4 py-2">
              Game Paused
            </div>
          )}
        </div>

        <Board
          squares={squares}
          winningLine={line}
          onClick={handleClick}
        />

        <GameControls
          onReset={resetGame}
          onPause={handlePause}
          onHome={handleHome}
        />

        <WinnerDialog
          winner={winner}
          isDraw={isDraw}
          onReset={resetGame}
          open={showWinnerDialog}
          onOpenChange={setShowWinnerDialog}
        />

        {vsAI && (
          <Button 
            variant="outline"
            onClick={resetEverything}
            className="w-full rounded-none"
          >
            Reset Everything
          </Button>
        )}
      </div>

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;