
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trophy, Frown } from "lucide-react";
import Confetti from "react-confetti";
import { useWindowSize } from "@/hooks/use-window-size";

interface MemoryWinnerDialogProps {
  isWin: boolean;
  moves: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
  onHome: () => void;
}

const MemoryWinnerDialog = ({
  isWin,
  moves,
  open,
  onOpenChange,
  onReset,
  onHome,
}: MemoryWinnerDialogProps) => {
  const { width, height } = useWindowSize();

  return (
    <>
      {isWin && open && <Confetti width={width} height={height} recycle={false} />}
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-center gap-2 text-xl">
              {isWin ? (
                <>
                  <Trophy className="text-yellow-500" />
                  You Won!
                </>
              ) : (
                <>
                  <Frown className="text-red-500" />
                  Game Over
                </>
              )}
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {isWin ? (
                <>Congratulations! You matched all pairs in {moves} moves.</>
              ) : (
                <>You ran out of moves. Try again!</>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex sm:justify-center gap-2 mt-4">
            <Button onClick={onReset}>Play Again</Button>
            <Button variant="outline" onClick={onHome}>
              Home
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default MemoryWinnerDialog;
