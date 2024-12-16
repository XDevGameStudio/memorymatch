import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CellProps {
  value: string | null;
  isWinning?: boolean;
  onClick: () => void;
}

const Cell: React.FC<CellProps> = ({ value, isWinning, onClick }) => {
  return (
    <motion.button
      whileHover={{ scale: value ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "w-full aspect-square rounded-lg text-4xl font-bold flex items-center justify-center",
        "transition-colors duration-200",
        "bg-white/50 hover:bg-white/60",
        "border-2 border-white/20",
        isWinning && "bg-green-200/50 hover:bg-green-200/60",
        !value && "hover:border-white/30"
      )}
      onClick={onClick}
    >
      {value && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={cn(
            value === 'X' ? 'text-blue-500' : 'text-rose-500'
          )}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Cell;