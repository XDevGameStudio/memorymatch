
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { UserRound, Monitor } from 'lucide-react';

// Simplified component to fix build errors
const StartScreen = ({ onStart }: { onStart: (againstAI: boolean) => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center gap-4"
    >
      <Button 
        onClick={() => onStart(true)}
        variant="default"
        className="w-full p-6 h-auto flex items-center justify-center gap-3"
      >
        <Monitor className="w-5 h-5" />
        <span>Play vs Computer</span>
      </Button>
      
      <Button 
        onClick={() => onStart(false)}
        variant="outline"
        className="w-full p-6 h-auto flex items-center justify-center gap-3"
      >
        <UserRound className="w-5 h-5" />
        <span>Play vs Friend</span>
      </Button>
    </motion.div>
  );
};

export default StartScreen;
