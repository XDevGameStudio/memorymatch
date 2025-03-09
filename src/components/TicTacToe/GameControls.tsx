
import { Button } from "@/components/ui/button";
import { RefreshCw, Home, Pause, Play } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface GameControlsProps {
  onReset: () => void;
  onHome: () => void;
  onPause?: () => void; // Make this optional to maintain backward compatibility
}

const GameControls = ({ onReset, onHome, onPause }: GameControlsProps) => {
  const [isPaused, setIsPaused] = useState(false);

  const handlePause = () => {
    if (onPause) {
      setIsPaused(!isPaused);
      onPause();
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex gap-2 mt-4"
    >
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onReset}>
        <RefreshCw className="h-4 w-4" />
      </Button>
      {onPause && (
        <Button variant="outline" size="icon" className="rounded-lg" onClick={handlePause}>
          {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </Button>
      )}
      <Button variant="outline" size="icon" className="rounded-lg" onClick={onHome}>
        <Home className="h-4 w-4" />
      </Button>
    </motion.div>
  );
};

export default GameControls;
