import { motion, AnimatePresence } from "framer-motion";
import Board from "./Board";
import PauseOverlay from "./PauseOverlay";

interface GameBoardProps {
  squares: (string | null)[];
  winningLine: number[] | null;
  isPaused: boolean;
  onCellClick: (i: number) => void;
  onResume: () => void;
}

const GameBoard = ({ squares, winningLine, isPaused, onCellClick, onResume }: GameBoardProps) => {
  return (
    <div className="relative">
      <AnimatePresence>
        {isPaused && <PauseOverlay onResume={onResume} />}
      </AnimatePresence>
      <Board
        squares={squares}
        winningLine={winningLine}
        onClick={onCellClick}
      />
    </div>
  );
};

export default GameBoard;