import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTheme } from "@/hooks/use-theme";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Moon, Sun, HelpCircle, User2, Bot } from "lucide-react";
import Game from '@/components/TicTacToe/Game';
import StartScreen from '@/components/TicTacToe/StartScreen';

const Index = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Header with theme and help buttons */}
      <div className="fixed top-4 right-4 flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon" className="rounded-full">
              <HelpCircle className="h-5 w-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>How to Play</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p>1. Choose your game mode: VS AI or VS Player</p>
              <p>2. Take turns placing X's and O's on the board</p>
              <p>3. Get three in a row horizontally, vertically, or diagonally to win</p>
              <p>4. The game will automatically detect wins and ties</p>
              <p>5. Use the Reset button to start a new game</p>
            </div>
          </DialogContent>
        </Dialog>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <h1 className="text-4xl font-bold mb-12">Tic Tac Toe</h1>
        <Game />
      </div>

      {/* Footer */}
      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground">created by x dev</p>
      </div>
    </div>
  );
};

export default Index;