import React from 'react';
import { Theme } from '@/hooks/use-theme';
import ThemeSelector from '../TicTacToe/ThemeSelector';
import { Button } from '../ui/button';

interface GameStartProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onStart: () => void;
}

const GameStart = ({ theme, setTheme, onStart }: GameStartProps) => {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center gap-8 p-4 bg-background text-foreground">
      <ThemeSelector theme={theme} setTheme={setTheme} />
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Memory Match X</h1>
        <Button 
          onClick={onStart}
          size="lg"
          className="text-xl px-8 py-6"
        >
          Play Game
        </Button>
      </div>
      <div className="absolute bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-mono font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default GameStart;