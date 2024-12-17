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
        isWinning && "bg-orange-500/20 dark:bg-orange-500/30"
      )}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;