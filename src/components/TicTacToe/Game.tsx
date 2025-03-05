import React, { useEffect } from 'react';
import Board from './Board';
import { getBestMove } from './aiUtils';
import { useTheme } from '@/hooks/use-theme';
import StartScreen from './StartScreen';
import WinnerDialog from './WinnerDialog';
import GameControls from './GameControls';
import PlayerStats from './PlayerStats';
import ThemeSelector from './ThemeSelector';
import GameModeSelector from './GameModeSelector';
import GameHeader from './GameHeader';
import DifficultySelector from './DifficultySelector';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState } from './hooks/useGameState';
import { calculateWinner, isBoardFull } from './utils/gameCalculations';

const Game = () => {
  const { state, setters } = useGameState();
  const { theme, setTheme } = useTheme();
  
  const { winner, line } = calculateWinner(state.squares);
  const boardIsFull = isBoardFull(state.squares);
  const isDraw = !winner && boardIsFull;
  const isWin = winner === 'X';

  useEffect(() => {
    if (!state.isXNext && !winner && !isDraw && state.vsAI && !state.isPaused) {
      const timer = setTimeout(() => {
        const aiMove = getBestMove(state.squares, state.difficulty);
        const newSquares = state.squares.slice();
        newSquares[aiMove] = 'O';
        setters.setSquares(newSquares);
        setters.setIsXNext(true);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [state.isXNext, state.squares, winner, isDraw, state.difficulty, state.vsAI, state.isPaused]);

  useEffect(() => {
    if (winner || isDraw) {
      setters.setShowWinnerDialog(true);
    }
  }, [winner, isDraw]);

  useEffect(() => {
    if (winner) {
      if ((state.vsAI && winner === 'X') || (!state.vsAI && winner === 'X')) {
        setters.setWins(prev => prev + 1);
      } else {
        setters.setLosses(prev => prev + 1);
      }
    }
  }, [winner, state.vsAI]);

  const handleClick = (i: number) => {
    if (state.isPaused) {
      setters.setIsPaused(false);
      return;
    }

    if (winner || state.squares[i] || (!state.isXNext && state.vsAI)) return;

    const newSquares = state.squares.slice();
    newSquares[i] = state.isXNext ? 'X' : 'O';
    setters.setSquares(newSquares);
    setters.setIsXNext(!state.isXNext);
  };

  const resetGame = () => {
    setters.setSquares(Array(9).fill(null));
    setters.setIsXNext(true);
    setters.setShowWinnerDialog(false);
    setters.setIsPaused(false);
  };

  const handleStartGame = (againstAI: boolean) => {
    setters.setVsAI(againstAI);
    resetGame();
    setters.setWins(0);
    setters.setLosses(0);
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
        
        {state.vsAI === null ? (
          <StartScreen onStart={handleStartGame} />
        ) : (
          <>
            <div className="w-full flex flex-col gap-4">
              <GameModeSelector 
                vsAI={state.vsAI} 
                onModeChange={(isAI) => {
                  setters.setVsAI(isAI);
                  resetGame();
                  setters.setWins(0);
                  setters.setLosses(0);
                }} 
              />
              
              {state.vsAI && (
                <DifficultySelector
                  currentDifficulty={state.difficulty}
                  onSelect={setters.setDifficulty}
                />
              )}
            </div>

            <PlayerStats wins={state.wins} losses={state.losses} vsAI={state.vsAI} />

            <AnimatePresence>
              {!winner && !isDraw && !state.isPaused && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg"
                >
                  Turn: <span className="font-bold">{state.isXNext ? 'X' : 'O'}</span>
                </motion.div>
              )}
            </AnimatePresence>

            <Board
              squares={state.squares}
              winningLine={line}
              onClick={handleClick}
            />

            <GameControls
              onReset={resetGame}
              onPause={() => setters.setIsPaused(!state.isPaused)}
              onHome={() => {
                setters.setVsAI(null);
                resetGame();
                setters.setWins(0);
                setters.setLosses(0);
              }}
            />

            <WinnerDialog
              winner={winner}
              isDraw={isDraw}
              onReset={resetGame}
              open={state.showWinnerDialog}
              onOpenChange={setters.setShowWinnerDialog}
              isWin={isWin}
            />
          </>
        )}
      </motion.div>

      <div className="fixed bottom-12 right-8">
        <p className="text-sm text-primary font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;
