import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Move } from 'lucide-react';
import DifficultySelector from '../TicTacToe/DifficultySelector';
import { Difficulty } from './types';

interface GameControlsProps {
  moves: number;
  maxMoves: number;
  totalWins: number;
  difficulty: Difficulty;
  onDifficultyChange: (d: Difficulty) => void;
}

const GameControls = ({ moves, maxMoves, totalWins, difficulty, onDifficultyChange }: GameControlsProps) => {
  return (
    <>
      <DifficultySelector
        currentDifficulty={difficulty}
        onSelect={onDifficultyChange}
      />

      <div className="flex items-center gap-6 bg-primary/10 px-6 py-3 rounded-lg">
        <div className="flex items-center gap-2">
          <Move className="w-5 h-5" />
          <span className="font-bold">{moves}/{maxMoves}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5" />
          <span className="font-bold">{totalWins}</span>
        </div>
      </div>
    </>
  );
};

export default GameControls;