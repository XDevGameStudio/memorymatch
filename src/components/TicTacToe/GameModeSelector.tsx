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
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center gap-4 w-full"
    >
      <h2 className="text-lg font-medium">Game Mode</h2>
      <RadioGroup
        defaultValue={vsAI ? "ai" : "player"}
        onValueChange={(value) => onModeChange(value === "ai")}
        className="flex gap-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ai" id="ai" />
          <Label htmlFor="ai">vs AI</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="player" id="player" />
          <Label htmlFor="player">vs Player</Label>
        </div>
      </RadioGroup>
    </motion.div>
  );
};

export default GameModeSelector;