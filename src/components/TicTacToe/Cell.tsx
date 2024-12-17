import React from 'react';
import { cn } from "@/lib/utils";

interface CellProps {
  value: string | null;
  onClick: () => void;
  isWinning?: boolean;
}

const Cell: React.FC<CellProps> = ({ value, onClick, isWinning }) => {
  return (
    <button
      className={cn(
        "w-full h-full flex items-center justify-center text-4xl font-bold transition-all duration-200",
        "hover:bg-primary/5 active:bg-primary/10",
        "border border-border rounded-md",
        "dark:bg-white/10 dark:hover:bg-white/20",
        isWinning && "relative after:absolute after:left-0 after:top-1/2 after:w-full after:h-0.5 after:bg-black dark:after:bg-white"
      )}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;