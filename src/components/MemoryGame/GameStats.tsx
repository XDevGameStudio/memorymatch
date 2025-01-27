import React from 'react';
import { Trophy, Move } from 'lucide-react';
import { Difficulty } from './types';

interface GameStatsProps {
  moves: number;
  maxMoves: Record<Difficulty, number>;
  difficulty: Difficulty;
  totalWins: number;
}

const GameStats = ({ moves, maxMoves, difficulty, totalWins }: GameStatsProps) => {
  return (
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
  );
};

export default GameStats;