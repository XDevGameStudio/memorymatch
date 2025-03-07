
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Card as CardType, Difficulty } from './types';
import { createDeck } from './gameUtils';
import { Trophy, Move } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameGrid from './GameGrid';
import MemoryThemeSelector from './MemoryThemeSelector';
import MemoryDifficultySelector from './MemoryDifficultySelector';
import MemoryGameControls from './MemoryGameControls';
import MemoryWinnerDialog from './MemoryWinnerDialog';

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
      setShowWinnerDialog(false);
    }
  }, [gameStarted, difficulty]);

  useEffect(() => {
    const hasWon = matchedPairs === cards.length / 2 && cards.length > 0;
    const hasLost = moves >= maxMoves[difficulty];
    
    if ((hasWon || hasLost) && !showWinnerDialog) {
      if (hasWon) {
        setTotalWins(prev => prev + 1);
      }
      setShowWinnerDialog(true);
    }
  }, [matchedPairs, cards.length, moves, maxMoves, difficulty, showWinnerDialog]);

  const handleCardClick = (index: number) => {
    if (moves >= maxMoves[difficulty]) {
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
      setIsShuffling(false);
    }, 300);
    
    return () => clearTimeout(timer);
  };

  const handleDifficultySelect = (selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setGameStarted(true);
  };

  if (!gameStarted) {
    return (
      <div className="h-full w-full flex flex-col items-center justify-center gap-6 p-4 bg-background text-foreground">
        <MemoryThemeSelector theme={theme} setTheme={setTheme} />
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Memory Match X</h1>
          <Button 
            size="lg"
            className="text-xl px-8 py-6"
            onClick={() => setGameStarted(true)}
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
      <MemoryThemeSelector theme={theme} setTheme={setTheme} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 w-full max-w-[800px]"
      >
        <MemoryDifficultySelector
          currentDifficulty={difficulty}
          onSelect={(d) => {
            setDifficulty(d);
            const newDeck = createDeck(d);
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

        <MemoryGameControls
          onReset={resetGame}
          onHome={() => {
            setGameStarted(false);
            resetGame();
          }}
        />
      </motion.div>

      <MemoryWinnerDialog
        isWin={matchedPairs === cards.length / 2}
        moves={moves}
        onReset={resetGame}
        onHome={() => {
          setGameStarted(false);
          resetGame();
        }}
        open={showWinnerDialog}
        onOpenChange={setShowWinnerDialog}
      />

      <div className="fixed bottom-4 right-4">
        <p className="font-bold text-primary text-sm">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;
