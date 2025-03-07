
import { Button } from "@/components/ui/button";
import { Difficulty } from "./types";

interface MemoryDifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

const MemoryDifficultySelector = ({ currentDifficulty, onSelect }: MemoryDifficultySelectorProps) => {
  return (
    <div className="flex gap-2">
      <Button 
        variant={currentDifficulty === "easy" ? "default" : "outline"} 
        size="sm"
        onClick={() => onSelect("easy")}
      >
        Easy
      </Button>
      <Button 
        variant={currentDifficulty === "medium" ? "default" : "outline"} 
        size="sm"
        onClick={() => onSelect("medium")}
      >
        Medium
      </Button>
      <Button 
        variant={currentDifficulty === "hard" ? "default" : "outline"} 
        size="sm"
        onClick={() => onSelect("hard")}
      >
        Hard
      </Button>
    </div>
  );
};

export default MemoryDifficultySelector;
