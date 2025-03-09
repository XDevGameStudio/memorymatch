
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
  const [isResetting, setIsResetting] = useState(false);

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

  // Reset the isResetting flag when dialog changes to closed
  useEffect(() => {
    if (!open) {
      setIsResetting(false);
    }
  }, [open]);

  // Only activate confetti when dialog opens and it's a win
  useEffect(() => {
    if (open && isWin) {
      setConfettiActive(true);
    } else {
      setConfettiActive(false);
    }
  }, [open, isWin]);

  const handleReset = () => {
    // Prevent multiple clicks
    if (isResetting) return;
    setIsResetting(true);
    
    // First close the dialog
    onOpenChange(false);
    
    // Reset the game after the dialog is closed with a delay
    setTimeout(() => {
      onReset();
    }, 300);
  };

  const handleHome = () => {
    if (onHome) {
      // Prevent multiple clicks
      if (isResetting) return;
      setIsResetting(true);
      
      // First close the dialog
      onOpenChange(false);
      
      // Go home after the dialog is closed with a delay
      setTimeout(() => {
        onHome();
      }, 300);
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
      <Dialog open={open} onOpenChange={(newOpen) => {
        // If we're closing and not in reset mode, handle dialog close
        if (!newOpen && !isResetting) {
          onOpenChange(newOpen);
        }
        // If we're manually opening, allow it
        else if (newOpen) {
          onOpenChange(newOpen);
        }
      }}>
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
                disabled={isResetting}
              >
                <Home className="w-4 h-4" />
                Home
              </Button>
            )}
            <Button 
              onClick={handleReset}
              className="gap-2 transition-all active:scale-95"
              disabled={isResetting}
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
