import { Button } from "@/components/ui/button";
import { Home, RefreshCw, Pause } from "lucide-react";

interface GameControlsProps {
  onReset: () => void;
  onPause: () => void;
  onHome: () => void;
}

const GameControls = ({ onReset, onPause, onHome }: GameControlsProps) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button variant="outline" size="icon" className="rounded-none" onClick={onReset}>
        <RefreshCw className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-none" onClick={onPause}>
        <Pause className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="icon" className="rounded-none" onClick={onHome}>
        <Home className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default GameControls;