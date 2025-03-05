
import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';

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
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  const dialogTitle = isWin ? "Congratulations!" : "Game Over";
  const dialogDescription = isWin 
    ? `You've won in ${moves} moves!` 
    : "You've run out of moves! Try again?";

  return (
    <>
      {open && isWin && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
        />
      )}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-4xl font-bold">
              {dialogTitle}
            </DialogTitle>
            <DialogDescription className="text-center text-lg">
              {dialogDescription}
            </DialogDescription>
            <div className="flex flex-col items-center gap-4 py-4">
              {/* Additional content can go here if needed */}
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
    </>
  );
};

export default WinnerDialog;
