
import { Button } from "@/components/ui/button";
import { Difficulty } from "./types";

interface MemoryDifficultySelectorProps {
  currentDifficulty: Difficulty;
  onSelect: (difficulty: string) => void;
}

const MemoryDifficultySelector = ({
  currentDifficulty,
  onSelect,
}: MemoryDifficultySelectorProps) => {
  return (
    <div className="flex items-center gap-2 bg-primary/10 rounded-lg p-2">
      <Button
        onClick={() => onSelect('easy')}
        variant={currentDifficulty === 'easy' ? 'default' : 'outline'}
        size="sm"
        className="transition-all"
      >
        Easy
      </Button>
      <Button
        onClick={() => onSelect('medium')}
        variant={currentDifficulty === 'medium' ? 'default' : 'outline'}
        size="sm"
        className="transition-all"
      >
        Medium
      </Button>
      <Button
        onClick={() => onSelect('hard')}
        variant={currentDifficulty === 'hard' ? 'default' : 'outline'}
        size="sm"
        className="transition-all"
      >
        Hard
      </Button>
    </div>
  );
};

export default MemoryDifficultySelector;
