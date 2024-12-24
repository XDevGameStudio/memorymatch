import React, { useState, useEffect } from 'react';
import Board from './Board';
import { getBestMove } from './aiUtils';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/hooks/use-theme';
import StartScreen from './StartScreen';
import WinnerDialog from './WinnerDialog';
import GameControls from './GameControls';
import PlayerStats from './PlayerStats';
import ThemeSelector from './ThemeSelector';
import GameModeSelector from './GameModeSelector';
import { motion } from 'framer-motion';

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

  const handleStartGame = (againstAI: boolean) => {
    setVsAI(againstAI);
    resetGame();
    setWins(0);
    setLosses(0);
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleHome = () => {
    setVsAI(null);
    resetGame();
    setWins(0);
    setLosses(0);
  };

  const handleHelp = () => {
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
        <button class="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md" onclick="this.parentElement.parentElement.close()">Close</button>
      </div>
    `;
    dialog.className = "p-4 rounded-md bg-background text-foreground";
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('close', () => {
      document.body.removeChild(dialog);
    });
  };

  if (vsAI === null) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-background text-foreground">
        <ThemeSelector theme={theme} setTheme={setTheme} onHelp={handleHelp} />
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-8 w-full max-w-[800px] p-4"
        >
          <h1 className="text-4xl font-bold">Tic Tac Toe X</h1>
          <StartScreen onStart={handleStartGame} />
        </motion.div>
        <div className="fixed bottom-4 right-4">
          <p className="text-sm text-muted-foreground">created by x dev</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} onHelp={handleHelp} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8 w-full max-w-[300px]"
      >
        <GameModeSelector 
          vsAI={vsAI} 
          onModeChange={(isAI) => {
            setVsAI(isAI);
            resetGame();
            setWins(0);
            setLosses(0);
          }} 
        />

        {vsAI && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 w-full"
          >
            <h2 className="text-lg font-medium">AI Difficulty</h2>
            <div className="grid grid-cols-3 gap-2 w-full">
              {['easy', 'medium', 'hard'].map((level) => (
                <Button
                  key={level}
                  variant={difficulty === level ? "default" : "outline"}
                  onClick={() => setDifficulty(level as 'easy' | 'medium' | 'hard')}
                  className="capitalize w-full"
                >
                  {level}
                </Button>
              ))}
            </div>
          </motion.div>
        )}

        <PlayerStats wins={wins} losses={losses} vsAI={vsAI} />

        <div className="text-xl font-medium mb-4">
          {!winner && !isDraw && !isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-primary/5 px-4 py-2"
            >
              Turn: <span className="font-bold">{isXNext ? 'X' : 'O'}</span>
            </motion.div>
          )}
          {isPaused && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 bg-primary/5 px-4 py-2"
            >
              Game Paused
            </motion.div>
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
      </motion.div>

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;