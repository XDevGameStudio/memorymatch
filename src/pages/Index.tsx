
import MemoryGame from '@/components/MemoryGame/Game';

const Index = () => {
  return (
    <div className="h-screen w-full flex flex-col overflow-hidden">
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <MemoryGame />
      </div>
    </div>
  );
};

export default Index;
