import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Bot, User2 } from "lucide-react";

interface StartScreenProps {
  onStart: (vsAI: boolean) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center gap-8 w-full max-w-[800px] p-4"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        <Card 
          className="p-8 hover:border-primary transition-colors cursor-pointer flex flex-col items-center gap-6 rounded-lg hover:bg-primary/5"
          onClick={() => onStart(true)}
        >
          <Bot className="w-16 h-16" />
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Play vs AI</h3>
            <p className="text-sm text-muted-foreground">Challenge our AI opponent with adjustable difficulty</p>
          </div>
        </Card>

        <Card 
          className="p-8 hover:border-primary transition-colors cursor-pointer flex flex-col items-center gap-6 rounded-lg hover:bg-primary/5"
          onClick={() => onStart(false)}
        >
          <User2 className="w-16 h-16" />
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">Play vs Player</h3>
            <p className="text-sm text-muted-foreground">Challenge a friend in a multiplayer match</p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};

export default StartScreen;