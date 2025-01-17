import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useState } from "react";
import DifficultySelector from "./DifficultySelector";

interface StartScreenProps {
  onStart: (mode: boolean) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const [showDifficulty, setShowDifficulty] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-8 w-full max-w-[800px] p-4"
    >
      <div className="relative">
        <Button 
          onClick={() => setShowDifficulty(true)}
          size="lg"
          className="w-48 h-48 rounded-2xl text-2xl font-bold hover:scale-105 transition-transform relative overflow-hidden"
        >
          <AnimatePresence>
            {!showDifficulty && (
              <motion.div
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center absolute inset-0"
              >
                <Play className="w-12 h-12 mr-2" />
                Play
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDifficulty && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 flex flex-col items-center justify-center gap-4"
              >
                <div className="text-lg mb-2">Select Difficulty</div>
                <div className="flex flex-col gap-2 w-full px-4">
                  {['easy', 'medium', 'hard'].map((difficulty) => (
                    <Button
                      key={difficulty}
                      variant="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        onStart(true);
                      }}
                      className="w-full py-2 capitalize"
                    >
                      {difficulty}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </div>
    </motion.div>
  );
};

export default StartScreen;