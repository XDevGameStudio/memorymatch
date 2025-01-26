import React, { useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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
  const dialogRef = useRef<HTMLDivElement>(null);
  const [dialogPosition, setDialogPosition] = React.useState({ x: 0, y: 0, width: 0 });

  useEffect(() => {
    if (open && dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect();
      setDialogPosition({ 
        x: rect.x,
        y: rect.y,
        width: rect.width
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent ref={dialogRef} className="sm:max-w-md">
        {isWin && (
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={500}
            gravity={0.15}
            initialVelocityY={-20}
            wind={0}
            colors={['#FFD700', '#FFA500', '#FF69B4', '#00CED1', '#98FB98', '#FF1493', '#7B68EE']}
            confettiSource={{
              x: dialogPosition.x + (dialogPosition.width / 2),
              y: dialogPosition.y,
              w: 0,
              h: 0
            }}
            tweenDuration={5000}
            dragFriction={0.1}
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
            <RotateCcw className="w-4 h-4" />
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDialog;