import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameStatusProps {
  winner: string | null;
  isDraw: boolean;
  isXNext: boolean;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, isDraw, onReset }) => {
  const status = isDraw
    ? "Game Over - It's a Tie!"
    : winner
    ? `Winner: ${winner}`
    : null;

  if (!status) return null;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-medium text-primary"
      >
        {status}
      </motion.div>
      <Button
        variant="outline"
        onClick={onReset}
      >
        New Game
      </Button>
    </div>
  );
};

export default GameStatus;