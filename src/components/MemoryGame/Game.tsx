import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { motion } from 'framer-motion';
import { Card as CardType, Difficulty } from './types';
import { createDeck } from './gameUtils';
import GameControls from './GameControls';
import WinnerDialog from '../TicTacToe/WinnerDialog';
import GameGrid from './GameGrid';
import { Button } from '@/components/ui/button';
import GameLayout from './GameLayout';

const Game = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedIndexes, setFlippedIndexes] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number>(0);
  const [moves, setMoves] = useState<number>(0);
  const [totalWins, setTotalWins] = useState<number>(0);
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
      setShowWinnerDialog(false);
    }
  }, [gameStarted, difficulty]);

  useEffect(() => {
    const hasWon = matchedPairs === cards.length / 2 && cards.length > 0;
    if (hasWon && !showWinnerDialog) {
      setTotalWins(prev => prev + 1);
      setShowWinnerDialog(true);
    }
  }, [matchedPairs, cards.length, showWinnerDialog]);

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
    setTimeout(() => {
      const newDeck = createDeck(difficulty);
      setCards(newDeck);
      setFlippedIndexes([]);
      setMatchedPairs(0);
      setMoves(0);
      setShowWinnerDialog(false);
      setIsPaused(false);
      setIsShuffling(false);
    }, 300);
  };

  if (!gameStarted) {
    return (
      <GameLayout theme={theme} setTheme={setTheme}>
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
      </GameLayout>
    );
  }

  return (
    <GameLayout theme={theme} setTheme={setTheme}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-4 w-full max-w-[800px]"
      >
        <GameControls
          moves={moves}
          maxMoves={maxMoves[difficulty]}
          totalWins={totalWins}
          difficulty={difficulty}
          onDifficultyChange={(d) => {
            setDifficulty(d);
            const newDeck = createDeck(d);
            setCards(newDeck);
            setFlippedIndexes([]);
            setMatchedPairs(0);
            setMoves(0);
          }}
        />

        <GameGrid
          cards={cards}
          difficulty={difficulty}
          isShuffling={isShuffling}
          flippedIndexes={flippedIndexes}
          onCardClick={handleCardClick}
        />

        <div className="flex gap-2">
          <Button variant="outline" onClick={resetGame}>
            Shuffle
          </Button>
          <Button variant="outline" onClick={() => {
            setGameStarted(false);
            resetGame();
          }}>
            Home
          </Button>
        </div>
      </motion.div>

      <WinnerDialog
        winner="X"
        isDraw={false}
        onReset={() => {
          resetGame();
          setShowWinnerDialog(false);
        }}
        onHome={() => {
          setGameStarted(false);
          resetGame();
          setShowWinnerDialog(false);
        }}
        open={showWinnerDialog}
        onOpenChange={setShowWinnerDialog}
        isWin={true}
        moves={moves}
      />
    </GameLayout>
  );
};

export default Game;