import React, { useState, useEffect } from 'react';
import { getBestMove } from './aiUtils';
import { useTheme } from '@/hooks/use-theme';
import StartScreen from './StartScreen';
import WinnerDialog from './WinnerDialog';
import ThemeSelector from './ThemeSelector';
import GameHeader from './GameHeader';
import GameBoard from './GameBoard';
import GameInterface from './GameInterface';
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
    if (isPaused) {
      setIsPaused(false);
      return;
    }

    if (winner || squares[i] || (!isXNext && vsAI)) return;

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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-8 w-full max-w-[300px]"
      >
        <GameHeader />
        
        {vsAI === null ? (
          <StartScreen onStart={handleStartGame} />
        ) : (
          <>
            <GameInterface
              vsAI={vsAI}
              difficulty={difficulty}
              wins={wins}
              losses={losses}
              isXNext={isXNext}
              winner={winner}
              isDraw={isDraw}
              isPaused={isPaused}
              onDifficultyChange={setDifficulty}
              onModeChange={(isAI) => {
                setVsAI(isAI);
                resetGame();
                setWins(0);
                setLosses(0);
              }}
              onReset={resetGame}
              onPause={() => setIsPaused(!isPaused)}
              onHome={() => {
                setVsAI(null);
                resetGame();
                setWins(0);
                setLosses(0);
              }}
            />

            <GameBoard
              squares={squares}
              winningLine={line}
              isPaused={isPaused}
              onCellClick={handleClick}
              onResume={() => setIsPaused(false)}
            />

            <WinnerDialog
              winner={winner}
              isDraw={isDraw}
              onReset={resetGame}
              open={showWinnerDialog}
              onOpenChange={setShowWinnerDialog}
            />
          </>
        )}
      </motion.div>

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;