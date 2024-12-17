import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface WinnerDialogProps {
  winner: string | null;
  isDraw: boolean;
  onReset: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const WinnerDialog = ({ winner, isDraw, onReset, open, onOpenChange }: WinnerDialogProps) => {
  if (!winner && !isDraw) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">
            {isDraw ? "It's a Draw!" : `Player ${winner} Wins!`}
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center pt-4">
          <Button onClick={() => {
            onReset();
            onOpenChange(false);
          }}>
            Play Again
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WinnerDialog;