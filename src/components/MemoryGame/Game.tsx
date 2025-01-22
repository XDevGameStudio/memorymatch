import React, { useState, useEffect } from 'react';
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
  const [isShuffling, setIsShuffling] = useState(false);
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
      setIsShuffling(false);
    }
  }, [gameStarted, difficulty]);

  useEffect(() => {
    if (matchedPairs === cards.length / 2 && cards.length > 0) {
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
    setIsShuffling(true);
    const timer = setTimeout(() => {
      const newDeck = createDeck(difficulty);
      setCards(newDeck);
      setFlippedIndexes([]);
      setMatchedPairs(0);
      setMoves(0);
      setShowWinnerDialog(false);
      setIsPaused(false);
      setIsShuffling(false);
    }, 300);
    
    return () => clearTimeout(timer);
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground">
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
            const newDeck = createDeck(d as Difficulty);
            setCards(newDeck);
            setFlippedIndexes([]);
            setMatchedPairs(0);
            setMoves(0);
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

        <GameGrid
          cards={cards}
          difficulty={difficulty}
          isShuffling={isShuffling}
          flippedIndexes={flippedIndexes}
          onCardClick={handleCardClick}
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