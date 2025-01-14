import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, RotateCw } from 'lucide-react';
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

  if (!winner && !isDraw && !open) return null;

  const dialogCenter = {
    x: windowSize.width / 2,
    y: windowSize.height / 2,
    w: 0,
    h: 0
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {isWin && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            confettiSource={dialogCenter}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            initialVelocityY={-15}
            wind={0}
            colors={['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff']}
          />
        )}
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
              onClick={() => {
                onHome();
                onOpenChange(false);
              }}
              className="gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
          )}
          <Button 
            onClick={() => {
              onReset();
              onOpenChange(false);
            }}
            className="gap-2"
          >
            <RotateCw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDialog;