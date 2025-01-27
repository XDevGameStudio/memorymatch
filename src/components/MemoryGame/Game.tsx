import React, { useState, useEffect } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Card as CardType, Difficulty } from './types';
import { createDeck } from './gameUtils';
import DifficultySelector from '../TicTacToe/DifficultySelector';
import GameControls from '../TicTacToe/GameControls';
import WinnerDialog from '../TicTacToe/WinnerDialog';
import GameGrid from './GameGrid';
import GameLayout from './GameLayout';
import GameStats from './GameStats';
import GameStart from './GameStart';

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
    const hasLost = moves >= maxMoves[difficulty];
    
    if ((hasWon || hasLost) && gameStarted && !showWinnerDialog) {
      if (hasWon) {
        setTotalWins(prev => prev + 1);
      }
      setShowWinnerDialog(true);
    }
  }, [matchedPairs, cards.length, moves, maxMoves, difficulty, showWinnerDialog, gameStarted]);

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
      <GameStart 
        theme={theme} 
        setTheme={setTheme} 
        onStart={() => setGameStarted(true)} 
      />
    );
  }

  return (
    <GameLayout theme={theme} setTheme={setTheme}>
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

      <GameStats 
        moves={moves}
        maxMoves={maxMoves}
        difficulty={difficulty}
        totalWins={totalWins}
      />

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

      <WinnerDialog
        winner={matchedPairs === cards.length / 2 ? 'X' : null}
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
        isWin={matchedPairs === cards.length / 2}
        moves={moves}
      />
    </GameLayout>
  );
};

export default Game;