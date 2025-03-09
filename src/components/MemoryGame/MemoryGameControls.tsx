
import { Button } from "@/components/ui/button";
import { Home, RotateCcw } from "lucide-react";

interface MemoryGameControlsProps {
  onReset: () => void;
  onHome: () => void;
}

const MemoryGameControls = ({ onReset, onHome }: MemoryGameControlsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button onClick={onHome} variant="outline" size="icon" className="rounded-lg">
        <Home className="w-5 h-5" />
      </Button>
      <Button onClick={onReset} variant="outline" size="icon" className="rounded-lg">
        <RotateCcw className="w-5 h-5" />
      </Button>
    </div>
  );
};

export default MemoryGameControls;
