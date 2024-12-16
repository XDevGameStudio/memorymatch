import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface GameStatusProps {
  winner: string | null;
  isXNext: boolean;
  onReset: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ winner, isXNext, onReset }) => {
  const status = winner
    ? `Winner: ${winner}`
    : `Next player: ${isXNext ? 'X' : 'O'}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <motion.div
        key={status}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-2xl font-semibold text-white/90"
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