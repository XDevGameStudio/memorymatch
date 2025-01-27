import React from 'react';
import { Theme } from '@/hooks/use-theme';
import ThemeSelector from '../TicTacToe/ThemeSelector';
import { motion } from 'framer-motion';

interface GameLayoutProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  children: React.ReactNode;
}

const GameLayout = ({ theme, setTheme, children }: GameLayoutProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-6 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center gap-6 w-full max-w-[800px]"
      >
        {children}
      </motion.div>
      <div className="absolute bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-mono font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default GameLayout;