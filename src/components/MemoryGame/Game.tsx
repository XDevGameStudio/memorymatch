import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Card as CardType, Difficulty } from './types';
import { createDeck } from './gameUtils';
import ThemeSelector from '../TicTacToe/ThemeSelector';
import DifficultySelector from '../TicTacToe/DifficultySelector';
import GameControls from '../TicTacToe/GameControls';
import WinnerDialog from '../TicTacToe/WinnerDialog';
import GameBoard from './GameBoard';
import GameStats from './GameStats';

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
      const newDeck = createDeck(difficulty);
      setCards(newDeck);
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
    const newDeck = createDeck(difficulty);
    setCards(newDeck);
    setFlippedIndexes([]);
    setMatchedPairs(0);
    setMoves(0);
    setShowWinnerDialog(false);
    setIsPaused(false);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground">
        <ThemeSelector theme={theme} setTheme={setTheme} />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Memory Match X</h1>
          <button
            onClick={() => setGameStarted(true)}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity"
          >
            Play
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 w-full max-w-[800px]"
      >
        <DifficultySelector
          currentDifficulty={difficulty}
          onSelect={(d) => {
            setDifficulty(d as Difficulty);
            resetGame();
          }}
        />

        <GameStats
          moves={moves}
          matchedPairs={matchedPairs}
          difficulty={difficulty}
          maxMoves={maxMoves}
        />

        <GameBoard
          cards={cards}
          difficulty={difficulty}
          flippedIndexes={flippedIndexes}
          handleCardClick={handleCardClick}
        />

        <GameControls
          onReset={resetGame}
          onPause={() => setIsPaused(!isPaused)}
          onHome={() => {
            setGameStarted(false);
            resetGame();
          }}
        />
      </motion.div>

      <WinnerDialog
        winner={matchedPairs === cards.length / 2 ? 'X' : null}
        isDraw={false}
        onReset={resetGame}
        onHome={() => {
          setGameStarted(false);
          resetGame();
        }}
        open={showWinnerDialog}
        onOpenChange={setShowWinnerDialog}
        isWin={matchedPairs === cards.length / 2}
        moves={moves}
      />
    </div>
  );
};

export default Game;