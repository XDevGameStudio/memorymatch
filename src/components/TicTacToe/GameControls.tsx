import { Button } from "@/components/ui/button";
import { RefreshCw, Pause, Home } from "lucide-react";
import { motion } from "framer-motion";

interface GameControlsProps {
  onReset: () => void;
  onPause: () => void;
  onHome: () => void;
}

const GameControls = ({ onReset, onPause, onHome }: GameControlsProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-2 mt-4"
    >
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onPause}>
        <Pause className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onReset}>
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onHome}>
        <Home className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default GameControls;