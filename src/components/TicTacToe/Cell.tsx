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
        "w-full aspect-square rounded-none text-4xl font-bold flex items-center justify-center",
        "transition-all duration-200",
        "border border-primary/20",
        "hover:bg-primary/5",
        isWinning && "bg-primary/10",
        !value && "hover:border-primary/40"
      )}
      onClick={onClick}
    >
      {value && (
        <motion.span
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn(
            value === 'X' ? 'text-primary' : 'text-primary'
          )}
        >
          {value}
        </motion.span>
      )}
    </motion.button>
  );
};

export default Cell;