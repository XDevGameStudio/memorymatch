import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { Bot, User2 } from "lucide-react";

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
      className="flex flex-col items-center gap-4 w-full"
    >
      <RadioGroup
        defaultValue={vsAI ? "ai" : "player"}
        onValueChange={(value) => onModeChange(value === "ai")}
        className="flex flex-col md:flex-row gap-4 w-full max-w-md"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer w-full transition-colors duration-200 ${
            vsAI ? 'bg-primary/20' : 'bg-primary/5'
          }`}
        >
          <RadioGroupItem value="ai" id="ai" className="rounded-full" />
          <Bot className="w-4 h-4" />
          <Label htmlFor="ai">vs AI</Label>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg cursor-pointer w-full transition-colors duration-200 ${
            !vsAI ? 'bg-primary/20' : 'bg-primary/5'
          }`}
        >
          <RadioGroupItem value="player" id="player" className="rounded-full" />
          <User2 className="w-4 h-4" />
          <Label htmlFor="player">vs Player</Label>
        </motion.div>
      </RadioGroup>
    </motion.div>
  );
};

export default GameModeSelector;