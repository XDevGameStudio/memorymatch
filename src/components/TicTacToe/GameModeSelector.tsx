import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

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
      <h2 className="text-lg font-medium">Game Mode</h2>
      <RadioGroup
        defaultValue={vsAI ? "ai" : "player"}
        onValueChange={(value) => onModeChange(value === "ai")}
        className="flex gap-4"
      >
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-none cursor-pointer"
        >
          <RadioGroupItem value="ai" id="ai" className="rounded-none" />
          <Label htmlFor="ai">vs AI</Label>
        </motion.div>
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-none cursor-pointer"
        >
          <RadioGroupItem value="player" id="player" className="rounded-none" />
          <Label htmlFor="player">vs Player</Label>
        </motion.div>
      </RadioGroup>
    </motion.div>
  );
};

export default GameModeSelector;