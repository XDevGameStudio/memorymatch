import Game from '@/components/TicTacToe/Game';

const Index = () => {
  return (
    <div className="min-h-screen w-full flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <Game />
      </div>

      <div className="fixed bottom-4 right-4">
        <p className="text-sm text-muted-foreground font-bold">created by x dev</p>
      </div>
    </div>
  );
};

export default Index;