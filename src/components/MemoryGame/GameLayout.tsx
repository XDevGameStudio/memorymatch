import React from 'react';
import { motion } from 'framer-motion';
import ThemeSelector from '../TicTacToe/ThemeSelector';

interface GameLayoutProps {
  children: React.ReactNode;
  theme: string;
  setTheme: (theme: string) => void;
}

const GameLayout = ({ children, theme, setTheme }: GameLayoutProps) => {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center gap-4 p-4 bg-background text-foreground relative">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      {children}
      <div className="absolute bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-bold font-sans">created by x dev</p>
      </div>
    </div>
  );
};

export default GameLayout;