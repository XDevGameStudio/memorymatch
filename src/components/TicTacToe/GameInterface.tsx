import { motion, AnimatePresence } from "framer-motion";
import GameControls from "./GameControls";
import DifficultySelector from "./DifficultySelector";
import GameModeSelector from "./GameModeSelector";
import PlayerStats from "./PlayerStats";

interface GameInterfaceProps {
  vsAI: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  wins: number;
  losses: number;
  isXNext: boolean;
  winner: string | null;
  isDraw: boolean;
  isPaused: boolean;
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void;
  onModeChange: (isAI: boolean) => void;
  onReset: () => void;
  onPause: () => void;
  onHome: () => void;
}

const GameInterface = ({
  vsAI,
  difficulty,
  wins,
  losses,
  isXNext,
  winner,
  isDraw,
  isPaused,
  onDifficultyChange,
  onModeChange,
  onReset,
  onPause,
  onHome
}: GameInterfaceProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col gap-4">
        <GameModeSelector
          vsAI={vsAI}
          onModeChange={onModeChange}
          onDifficultyChange={onDifficultyChange}
        />
        
        {vsAI && (
          <DifficultySelector
            currentDifficulty={difficulty}
            onSelect={onDifficultyChange}
          />
        )}
      </div>

      <PlayerStats wins={wins} losses={losses} vsAI={vsAI} />

      <AnimatePresence>
        {!winner && !isDraw && !isPaused && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 bg-primary/5 px-4 py-2 rounded-lg"
          >
            Turn: <span className="font-bold">{isXNext ? 'X' : 'O'}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <GameControls
        onReset={onReset}
        onPause={onPause}
        onHome={onHome}
      />
    </div>
  );
};

export default GameInterface;