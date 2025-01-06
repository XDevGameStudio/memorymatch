import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from 'lucide-react';
import Confetti from 'react-confetti';
import useWindowSize from 'react-confetti/dist/useWindowSize';

interface WinnerDialogProps {
  winner: string | null;
  isDraw: boolean;
  onReset: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onHome?: () => void;
}

const WinnerDialog = ({ winner, isDraw, onReset, open, onOpenChange, onHome }: WinnerDialogProps) => {
  const { width, height } = useWindowSize();

  if (!winner && !isDraw) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        {!isDraw && <Confetti width={width} height={height} recycle={false} numberOfPieces={200} />}
        <DialogHeader>
          <div className="flex flex-col items-center gap-4 py-4">
            <h2 className="text-4xl font-bold">Congratulations!</h2>
            <p className="text-lg text-muted-foreground text-center">
              {isDraw ? "It's a draw!" : `Player ${winner} wins!`}
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