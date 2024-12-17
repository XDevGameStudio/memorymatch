import React from 'react';
import Cell from './Cell';

interface BoardProps {
  squares: (string | null)[];
  winningLine: number[] | null;
  onClick: (i: number) => void;
}

const Board: React.FC<BoardProps> = ({ squares, winningLine, onClick }) => {
  const renderCell = (i: number) => (
    <Cell
      key={i}
      value={squares[i]}
      isWinning={winningLine?.includes(i)}
      onClick={() => onClick(i)}
    />
  );

  return (
    <div className="grid grid-cols-3 gap-2 w-full max-w-[300px] aspect-square">
      {Array(9).fill(null).map((_, i) => renderCell(i))}
    </div>
  );
};

export default Board;