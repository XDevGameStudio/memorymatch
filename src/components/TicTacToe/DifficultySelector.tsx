import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DifficultySelectorProps {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelector = ({
  currentDifficulty,
  onSelect,
}: DifficultySelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-1 bg-secondary rounded-lg p-1 w-full max-w-[200px] mx-auto"
    >
      {[
        { key: 'easy', label: 'E' },
        { key: 'medium', label: 'M' },
        { key: 'hard', label: 'H' }
      ].map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onSelect(key as 'easy' | 'medium' | 'hard')}
          className={cn(
            "flex-1 py-2 rounded-md transition-all font-mono text-sm font-bold",
            currentDifficulty === key 
              ? "bg-primary text-primary-foreground" 
              : "hover:bg-primary/10"
          )}
        >
          {label}
        </button>
      ))}
    </motion.div>
  );
};

export default DifficultySelector;