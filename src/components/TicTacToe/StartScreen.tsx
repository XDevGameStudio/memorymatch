import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

interface StartScreenProps {
  onStart: (vsAI: boolean) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-6 p-8 rounded-lg border border-primary/20"
    >
      <h1 className="text-2xl font-semibold text-primary">Tic Tac Toe</h1>
      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <Button 
          variant="outline" 
          onClick={() => onStart(true)}
          className="w-full h-12 text-lg"
        >
          Play vs AI
        </Button>
        <Button 
          variant="outline" 
          onClick={() => onStart(false)}
          className="w-full h-12 text-lg"
        >
          Play vs Player
        </Button>
      </div>
    </motion.div>
  );
};

export default StartScreen;