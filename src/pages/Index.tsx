import { useTheme } from "@/hooks/use-theme";
import Game from '@/components/TicTacToe/Game';

const Index = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="min-h-screen w-full flex flex-col">
      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
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