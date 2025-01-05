import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import { Card as CardType, Difficulty } from './types';
import { createDeck } from './gameUtils';
import StartScreen from '../TicTacToe/StartScreen';
import ThemeSelector from '../TicTacToe/ThemeSelector';
import DifficultySelector from '../TicTacToe/DifficultySelector';
import GameControls from '../TicTacToe/GameControls';
import WinnerDialog from '../TicTacToe/WinnerDialog';
import { Trophy, Move } from 'lucide-react';
import { cn } from '@/lib/utils';

const Game = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const { theme, setTheme } = useTheme();

  const maxMoves = {
    easy: 15,
    medium: 25,
    hard: 40
  };

  useEffect(() => {
    if (gameStarted) {
      setCards(createDeck(difficulty));
      setFlippedIndexes([]);
      setMatchedPairs(0);
      setMoves(0);
    }
  }, [gameStarted, difficulty]);

  useEffect(() => {
    if (matchedPairs > 0 && matchedPairs === cards.length / 2) {
      setShowWinnerDialog(true);
    }
    if (moves >= maxMoves[difficulty] && matchedPairs < cards.length / 2) {
      setShowWinnerDialog(true);
    }
  }, [matchedPairs, cards.length, moves, difficulty]);

  const handleCardClick = (index: number) => {
    if (isPaused || moves >= maxMoves[difficulty]) {
      setIsPaused(false);
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

  const resetGame = () => {
    setCards(createDeck(difficulty));
    setFlippedIndexes([]);
    setMatchedPairs(0);
    setMoves(0);
    setShowWinnerDialog(false);
    setIsPaused(false);
  };

  const gridSizeClass = {
    easy: "grid-cols-3 max-w-[300px]", // 4x3 grid
    medium: "grid-cols-5 max-w-[500px]", // 4x5 grid
    hard: "grid-cols-7 max-w-[700px]" // 4x7 grid
  };

  const getGridHeight = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'grid-rows-4';
      case 'medium':
        return 'grid-rows-4';
      case 'hard':
        return 'grid-rows-4';
      default:
        return 'grid-rows-4';
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 w-full max-w-[800px]"
      >
        {!gameStarted ? (
          <StartScreen onStart={() => setGameStarted(true)} />
        ) : (
          <>
            <DifficultySelector
              currentDifficulty={difficulty}
              onSelect={(d) => {
                setDifficulty(d as Difficulty);
                resetGame();
              }}
            />

            <div className="flex items-center gap-6 bg-primary/10 px-6 py-3 rounded-lg">
              <div className="flex items-center gap-2">
                <Move className="w-5 h-5" />
                <span className="font-bold">{moves}/{maxMoves[difficulty]}</span>
              </div>
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5" />
                <span className="font-bold">{matchedPairs}</span>
              </div>
            </div>

            <AnimatePresence>
              {isPaused && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPaused(false)}
                >
                  <div className="text-2xl font-bold">Game Paused</div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className={cn(
              "grid gap-2 w-full mx-auto",
              gridSizeClass[difficulty],
              getGridHeight(difficulty)
            )}>
              {cards.map((card, index) => (
                <Card
                  key={card.id}
                  value={card.value}
                  isFlipped={flippedIndexes.includes(index) || card.isMatched}
                  isMatched={card.isMatched}
                  onClick={() => handleCardClick(index)}
                />
              ))}
            </div>

            <GameControls
              onReset={resetGame}
              onPause={() => setIsPaused(!isPaused)}
              onHome={() => {
                setGameStarted(false);
                resetGame();
              }}
            />
          </>
        )}
      </motion.div>

      <WinnerDialog
        winner={moves >= maxMoves[difficulty] && matchedPairs < cards.length / 2 
          ? `Game Over! You ran out of moves.` 
          : `Congratulations! You completed the game in ${moves} moves!`}
        isDraw={false}
        onReset={resetGame}
        open={showWinnerDialog}
        onOpenChange={setShowWinnerDialog}
      />

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;