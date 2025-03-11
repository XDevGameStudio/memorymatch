
import React, { useState, useEffect, useRef } from 'react';
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
  
  const shuffleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const endShuffleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pendingDifficultyRef = useRef<Difficulty | null>(null);

  const maxMoves = {
    easy: 15,
    medium: 25,
    hard: 40
  };

  useEffect(() => {
    if (gameStarted && cards.length === 0) {
      resetGame(false);
    }
  }, [gameStarted]);

  useEffect(() => {
    if (gameStarted && cards.length > 0 && !isShuffling) {
      if (pendingDifficultyRef.current === null) {
        resetGame(false);
      }
    }
  }, [difficulty]);

  useEffect(() => {
    if (cards.length === 0 || showWinnerDialog || isGameOver) return;
    
    const hasWon = matchedPairs === cards.length / 2;
    const hasLost = moves >= maxMoves[difficulty];
    
    if (hasWon || hasLost) {
      if (hasWon) {
        setTotalWins(prev => prev + 1);
      }
      setIsGameOver(true);
      setShowWinnerDialog(true);
    }
  }, [matchedPairs, cards.length, moves, maxMoves, difficulty, showWinnerDialog, isGameOver]);

  useEffect(() => {
    // When shuffling stops, apply any pending difficulty change
    if (!isShuffling && pendingDifficultyRef.current !== null) {
      const newDifficulty = pendingDifficultyRef.current;
      pendingDifficultyRef.current = null;
      setDifficulty(newDifficulty);
    }
  }, [isShuffling]);

  useEffect(() => {
    return () => {
      if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
      if (endShuffleTimerRef.current) clearTimeout(endShuffleTimerRef.current);
    };
  }, []);

  const handleCardClick = (index: number) => {
    if (moves >= maxMoves[difficulty] || isShuffling || isGameOver) {
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
      if (isShuffling) {
        // Queue up the difficulty change to apply after current shuffle
        pendingDifficultyRef.current = newDifficulty;
      } else {
        setDifficulty(newDifficulty);
      }
    }
  };

  const resetGame = (skipAnimation = false) => {
    if (isShuffling) return;
    
    if (shuffleTimerRef.current) clearTimeout(shuffleTimerRef.current);
    if (endShuffleTimerRef.current) clearTimeout(endShuffleTimerRef.current);
    
    setIsShuffling(true);
    
    if (showWinnerDialog) {
      setShowWinnerDialog(false);
    }

    setIsGameOver(false);
    setFlippedIndexes([]);
    setMatchedPairs(0);
    setMoves(0);
    
    // Always create empty deck with current difficulty first
    const emptyDeck = createDeck(difficulty);
    setCards(emptyDeck);
    
    shuffleTimerRef.current = setTimeout(() => {
      const newDeck = createDeck(difficulty);
      setCards(newDeck);
      
      endShuffleTimerRef.current = setTimeout(() => {
        setIsShuffling(false);
      }, 1200);
    }, skipAnimation ? 0 : 300);
  };

  const handleWinnerDialogReset = () => {
    setShowWinnerDialog(false);
    setTimeout(() => {
      resetGame(false);
    }, 100);
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
            resetGame(false);
          }}
        />
      </motion.div>

      <WinnerDialog
        winner={matchedPairs === cards.length / 2 ? 'X' : null}
        isDraw={false}
        onReset={handleWinnerDialogReset}
        onHome={() => {
          setShowWinnerDialog(false);
          setGameStarted(false);
          resetGame(false);
        }}
        open={showWinnerDialog}
        onOpenChange={setShowWinnerDialog}
        isWin={matchedPairs === cards.length / 2}
        moves={moves}
      />

      <div className="fixed bottom-4 right-4">
        <p className="font-bold text-primary text-sm">created by x dev</p>
      </div>
    </div>
  );
};

export default Game;
