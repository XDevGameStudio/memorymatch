import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  isXNext: boolean;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, isXNext, onReset }) => {
  const status = isDraw
    ? "Game Over - It's a Tie!"
    : winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-gray-700"
      >
        {status}
      </motion.div>
      <Button
        variant="secondary"
        onClick={onReset}
        className="px-8"
      >
        Reset Game
      </Button>
    </div>
  );
};

export default GameStatus;