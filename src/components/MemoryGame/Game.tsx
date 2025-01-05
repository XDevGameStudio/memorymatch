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
  }, [matchedPairs, cards.length]);

  const handleCardClick = (index: number) => {
    if (isPaused) {
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-8 w-full max-w-[600px]"
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

            <div className="flex items-center gap-4 bg-primary/5 px-4 py-2 rounded-lg">
              <span>Moves: {moves}</span>
              <span>Matches: {matchedPairs}</span>
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

            <div className="grid grid-cols-4 gap-2 w-full">
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

            <WinnerDialog
              winner="You"
              isDraw={false}
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