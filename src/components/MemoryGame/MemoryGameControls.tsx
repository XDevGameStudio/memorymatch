
import { Button } from "@/components/ui/button";
import { Home, RotateCcw, Pause, Play } from "lucide-react";

interface MemoryGameControlsProps {
  onReset: () => void;
  onPause: () => void;
  onHome: () => void;
  isPaused: boolean;
}

const MemoryGameControls = ({ onReset, onPause, onHome, isPaused }: MemoryGameControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onHome} variant="outline" size="icon" className="rounded-lg">
        <Home className="w-5 h-5" />
      </Button>
      <Button onClick={onReset} variant="outline" size="icon" className="rounded-lg">
        <RotateCcw className="w-5 h-5" />
      </Button>
      <Button onClick={onPause} variant="outline" size="icon" className="rounded-lg">
        {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
      </Button>
    </div>
  );
};

export default MemoryGameControls;
