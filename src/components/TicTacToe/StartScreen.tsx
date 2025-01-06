import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

interface StartScreenProps {
  onStart: (mode: boolean) => void;  // Updated type signature to match usage
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-8 w-full max-w-[800px] p-4"
    >
      <Button 
        onClick={() => onStart(true)}  // Pass true for AI mode by default
        size="lg"
        className="w-48 h-48 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform"
      >
        <Play className="w-12 h-12 mr-2" />
        Play
      </Button>
    </motion.div>
  );
};

export default StartScreen;