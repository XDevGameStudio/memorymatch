import { motion } from "framer-motion";
import { Bot, User2 } from "lucide-react";

interface GameModeSelectorProps {
  vsAI: boolean;
  onModeChange: (isAI: boolean) => void;
  onDifficultyChange?: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const GameModeSelector = ({ vsAI, onModeChange, onDifficultyChange }: GameModeSelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col md:flex-row gap-4 w-full max-w-md"
    >
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => {
          onModeChange(true);
          if (onDifficultyChange) {
            onDifficultyChange('medium');
          }
        }}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-full transition-colors duration-200 ${
          vsAI ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        <Bot className="w-4 h-4" />
        <span>vs AI</span>
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onModeChange(false)}
        className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg w-full transition-colors duration-200 ${
          !vsAI ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        }`}
      >
        <User2 className="w-4 h-4" />
        <span>vs Player</span>
      </motion.button>
    </motion.div>
  );
};

export default GameModeSelector;