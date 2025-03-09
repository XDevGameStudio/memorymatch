
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
  const [confettiActive, setConfettiActive] = useState(false);

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

  // Only activate confetti when dialog opens and it's a win
  useEffect(() => {
    if (open && isWin) {
      setConfettiActive(true);
    } else {
      setConfettiActive(false);
    }
  }, [open, isWin]);

  const handleReset = () => {
    // First close the dialog
    onOpenChange(false);
    
    // Reset the game after the dialog is closed
    setTimeout(() => {
      onReset();
    }, 100);
  };

  const handleHome = () => {
    if (onHome) {
      // First close the dialog
      onOpenChange(false);
      
      // Go home after the dialog is closed
      setTimeout(() => {
        onHome();
      }, 100);
    }
  };

  const dialogTitle = isWin ? "Congratulations!" : "Game Over";
  const dialogDescription = isWin 
    ? `You've won in ${moves} moves!` 
    : "You've run out of moves! Try again?";

  return (
    <>
      {confettiActive && (
        <div className="fixed inset-0 z-[100] pointer-events-none">
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.15}
          />
        </div>
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
                className="gap-2 transition-all active:scale-95"
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            )}
            <Button 
              onClick={handleReset}
              className="gap-2 transition-all active:scale-95"
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
