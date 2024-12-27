import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Brain } from "lucide-react";

interface DifficultySelectorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
  currentDifficulty: 'easy' | 'medium' | 'hard';
}

const DifficultySelector = ({
  open,
  onOpenChange,
  onSelect,
  currentDifficulty,
}: DifficultySelectorProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Select AI Difficulty
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 mt-4">
          <Button
            variant={currentDifficulty === 'easy' ? 'default' : 'outline'}
            onClick={() => {
              onSelect('easy');
              onOpenChange(false);
            }}
            className="w-full justify-start"
          >
            Easy - AI makes random moves most of the time
          </Button>
          <Button
            variant={currentDifficulty === 'medium' ? 'default' : 'outline'}
            onClick={() => {
              onSelect('medium');
              onOpenChange(false);
            }}
            className="w-full justify-start"
          >
            Medium - AI makes some strategic moves
          </Button>
          <Button
            variant={currentDifficulty === 'hard' ? 'default' : 'outline'}
            onClick={() => {
              onSelect('hard');
              onOpenChange(false);
            }}
            className="w-full justify-start"
          >
            Hard - AI plays perfectly
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultySelector;