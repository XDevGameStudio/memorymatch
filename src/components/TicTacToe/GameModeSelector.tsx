import { motion } from "framer-motion";
import { Bot, User2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface GameModeSelectorProps {
  vsAI: boolean;
  onModeChange: (isAI: boolean) => void;
}

const GameModeSelector = ({ vsAI, onModeChange }: GameModeSelectorProps) => {
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
        onClick={() => onModeChange(true)}
        className={cn(
          "mode-button",
          vsAI && "mode-button-selected"
        )}
      >
        <Bot className="w-4 h-4" />
        <span>vs AI</span>
      </motion.button>
      
      <motion.button 
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onModeChange(false)}
        className={cn(
          "mode-button",
          !vsAI && "mode-button-selected"
        )}
      >
        <User2 className="w-4 h-4" />
        <span>vs Player</span>
      </motion.button>
    </motion.div>
  );
};

export default GameModeSelector;