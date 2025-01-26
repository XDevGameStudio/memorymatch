import React from 'react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from 'lucide-react';

interface WinnerDialogProps {
  winner: string | null;
  isDraw: boolean;
  onReset: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHome?: () => void;
  moves?: number;
  isWin?: boolean;
}

const WinnerDialog = ({ winner, isDraw, onReset, open, onOpenChange, onHome, moves, isWin }: WinnerDialogProps) => {
  const handleReset = () => {
    onReset();
    onOpenChange(false);
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <h2 className="text-4xl font-bold">
              {isWin 
                ? "Congratulations!" 
                : "Game Over"}
            </h2>
            <p className="text-lg text-muted-foreground text-center">
              {isWin 
                ? `You've won in ${moves} moves!`
                : "You've run out of moves! Try again?"}
            </p>
          </div>
        </DialogHeader>
        <div className="flex justify-center gap-4 pt-4">
          {onHome && (
            <Button 
              variant="outline" 
              onClick={handleHome}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          )}
          <Button 
            onClick={handleReset}
            className="gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDialog;