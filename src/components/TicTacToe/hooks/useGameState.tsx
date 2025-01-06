import { useState, useEffect } from 'react';
import { getBestMove } from '../aiUtils';

export interface GameState {
  squares: (string | null)[];
  isXNext: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  wins: number;
  losses: number;
  vsAI: boolean | null;
  showWinnerDialog: boolean;
  isPaused: boolean;
}

export const useGameState = () => {
  const [squares, setSquares] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);
  const [vsAI, setVsAI] = useState<boolean | null>(null);
  const [showWinnerDialog, setShowWinnerDialog] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  return {
    state: {
      squares,
      isXNext,
      difficulty,
      wins,
      losses,
      vsAI,
      showWinnerDialog,
      isPaused,
    },
    setters: {
      setSquares,
      setIsXNext,
      setDifficulty,
      setWins,
      setLosses,
      setVsAI,
      setShowWinnerDialog,
      setIsPaused,
    },
  };
};