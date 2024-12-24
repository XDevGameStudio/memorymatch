import { Card } from "@/components/ui/card";

interface PlayerStatsProps {
  wins: number;
  losses: number;
  vsAI: boolean;
}

const PlayerStats = ({ wins, losses, vsAI }: PlayerStatsProps) => {
  return (
    <div className="flex gap-8 text-lg">
      <div className="flex flex-col items-center">
        <span className="text-primary">{vsAI ? 'Wins' : 'Player X Wins'}</span>
        <span className="text-2xl font-medium">{wins}</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="text-primary">{vsAI ? 'Losses' : 'Player O Wins'}</span>
        <span className="text-2xl font-medium">{losses}</span>
      </div>
    </div>
  );
};

export default PlayerStats;