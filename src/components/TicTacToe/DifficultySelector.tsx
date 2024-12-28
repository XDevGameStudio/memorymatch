import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DifficultySelectorProps {
  currentDifficulty: 'easy' | 'medium' | 'hard';
  onSelect: (difficulty: 'easy' | 'medium' | 'hard') => void;
}

const DifficultySelector = ({
  currentDifficulty,
  onSelect,
}: DifficultySelectorProps) => {
  const difficulties = [
    { key: 'easy', label: 'Easy' },
    { key: 'medium', label: 'Medium' },
    { key: 'hard', label: 'Hard' }
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-2"
        >
          <Settings className="w-4 h-4" />
          <span className="capitalize">{currentDifficulty}</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[300px]">
        <DialogTitle>Select AI Difficulty</DialogTitle>
        <div className="flex flex-col gap-2">
          {difficulties.map(({ key, label }) => (
            <Button
              key={key}
              variant={currentDifficulty === key ? "default" : "outline"}
              className={cn(
                "w-full justify-center",
                currentDifficulty === key && "bg-primary text-primary-foreground"
              )}
              onClick={() => onSelect(key as 'easy' | 'medium' | 'hard')}
            >
              {label}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DifficultySelector;