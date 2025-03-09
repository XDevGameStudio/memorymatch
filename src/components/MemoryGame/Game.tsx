
import React, { useState, useEffect, useCallback } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Card as CardType, Difficulty } from './types';
import { createDeck } from './gameUtils';
import ThemeSelector from '../TicTacToe/ThemeSelector';
import DifficultySelector from '../TicTacToe/DifficultySelector';
import GameControls from '../TicTacToe/GameControls';
import WinnerDialog from '../TicTacToe/WinnerDialog';
import GameGrid from './GameGrid';
import { Trophy, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Game = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [totalWins, setTotalWins] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const { theme, setTheme } = useTheme();

  const maxMoves = {
    easy: 15,
    medium: 25,
    hard: 40
  };

  // Memoized resetGame function to avoid recreating it on every render
  const resetGame = useCallback((skipAnimation = false) => {
    // Don't shuffle if we're already shuffling
    if (isShuffling) return;
    
    // Set shuffling state to trigger animation
    setIsShuffling(true);
    
    // Reset game state
    setFlippedIndexes([]);
    setMatchedPairs(0);
    setMoves(0);
    setIsGameOver(false);
    
    // Add a small delay for the shuffling animation 
    // (can be skipped for initial load if desired)
    const animationDelay = skipAnimation ? 0 : 1000;
    
    setTimeout(() => {
      const newDeck = createDeck(difficulty);
      setCards(newDeck);
      
      // End the shuffling animation after cards are set
      setTimeout(() => {
        setIsShuffling(false);
      }, 300);
    }, animationDelay);
  }, [difficulty, isShuffling]);

  // Initialize the game when it first starts
  useEffect(() => {
    if (gameStarted) {
      resetGame(false); // Always show animation when entering game
    }
  }, [gameStarted, resetGame]);

  // Handle difficulty changes
  useEffect(() => {
    if (gameStarted && cards.length > 0) {
      resetGame(false);
    }
  }, [difficulty, resetGame, gameStarted, cards.length]);

  // Check for win/loss conditions
  useEffect(() => {
    // Only check win condition when cards exist and when we're not already showing the dialog
    // and when the game is not over or shuffling
    if (cards.length === 0 || showWinnerDialog || isGameOver || isShuffling) return;
    
    const hasWon = matchedPairs === cards.length / 2 && matchedPairs > 0;
    const hasLost = moves >= maxMoves[difficulty];
    
    if (hasWon || hasLost) {
      setIsGameOver(true);
      
      // Small delay to make sure we don't show the dialog during animations
      setTimeout(() => {
        if (hasWon) {
          setTotalWins(prev => prev + 1);
        }
        setShowWinnerDialog(true);
      }, 500);
    }
  }, [matchedPairs, cards.length, moves, maxMoves, difficulty, showWinnerDialog, isGameOver, isShuffling]);

  const handleCardClick = (index: number) => {
    // Prevent actions if game is over, shuffling, or dialog is showing
    if (isGameOver || isShuffling || showWinnerDialog) {
      return;
    }

    if (
      flippedIndexes.length === 2 ||
      flippedIndexes.includes(index) ||
      cards[index].isMatched
    ) {
      return;
    }

    const newFlippedIndexes = [...flippedIndexes, index];
    setFlippedIndexes(newFlippedIndexes);

    if (newFlippedIndexes.length === 2) {
      setMoves(moves + 1);
      const [firstIndex, secondIndex] = newFlippedIndexes;
      
      if (cards[firstIndex].value === cards[secondIndex].value) {
        setMatchedPairs(matchedPairs + 1);
        setCards(cards.map((card, i) => 
          i === firstIndex || i === secondIndex
            ? { ...card, isMatched: true }
            : card
        ));
        setFlippedIndexes([]);
      } else {
        setTimeout(() => {
          setFlippedIndexes([]);
        }, 1000);
      }
    }
  };

  const handleDifficultyChange = (newDifficulty: Difficulty) => {
    if (difficulty !== newDifficulty) {
      setDifficulty(newDifficulty);
    }
  };

  const handleWinnerDialogReset = () => {
    // Make sure dialog is closed and reset game
    setShowWinnerDialog(false);
    resetGame(false);
  };

  const handleWinnerDialogClose = (open: boolean) => {
    setShowWinnerDialog(open);
    // If dialog is closed, allow new game to start
    if (!open) {
      setIsGameOver(false);
    }
  };

  if (!gameStarted) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-4 bg-background text-foreground">
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Memory Match X</h1>
          <Button 
            onClick={() => setGameStarted(true)}
            size="lg"
            className="text-xl px-8 py-6"
          >
            Play Game
          </Button>
        </div>
        <div className="fixed bottom-4 right-4">
          <p className="font-bold text-primary text-sm">created by x dev</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 w-full max-w-[800px]"
      >
        <DifficultySelector
          currentDifficulty={difficulty}
          onSelect={handleDifficultyChange}
        />

        <div className="flex items-center gap-6 bg-primary/10 px-6 py-3 rounded-lg">
          <div className="flex items-center gap-2">
            <Move className="w-5 h-5" />
            <span className="font-bold">{moves}/{maxMoves[difficulty]}</span>
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5" />
            <span className="font-bold">{totalWins}</span>
          </div>
        </div>

        <GameGrid
          cards={cards}
          difficulty={difficulty}
          isShuffling={isShuffling}
          flippedIndexes={flippedIndexes}
          onCardClick={handleCardClick}
        />

        <GameControls
          onReset={() => resetGame(false)}
          onHome={() => {
            setGameStarted(false);
            setShowWinnerDialog(false);
            setIsGameOver(false);
            // Wait for animations to finish before resetting
            setTimeout(() => {
              resetGame(true);
            }, 300);
          }}
        />
      </motion.div>

      <WinnerDialog
        winner={matchedPairs === cards.length / 2 && matchedPairs > 0 ? 'X' : null}
        isDraw={false}
        onReset={handleWinnerDialogReset}
        onHome={() => {
          setGameStarted(false);
          setShowWinnerDialog(false);
          setIsGameOver(false);
          // Wait for animations to finish before resetting
          setTimeout(() => {
            resetGame(true);
          }, 300);
        }}
        open={showWinnerDialog}
        onOpenChange={handleWinnerDialogClose}
        isWin={matchedPairs === cards.length / 2 && matchedPairs > 0}
        moves={moves}
      />

      <div className="fixed bottom-4 right-4">
        <p className="font-bold text-primary text-sm">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;
