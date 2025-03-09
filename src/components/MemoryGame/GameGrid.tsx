
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Card from './Card';
import { Card as CardType, Difficulty } from './types';

interface GameGridProps {
  cards: CardType[];
  difficulty: Difficulty;
  isShuffling: boolean;
  flippedIndexes: number[];
  onCardClick: (index: number) => void;
}

const GameGrid: React.FC<GameGridProps> = ({
  cards,
  difficulty,
  isShuffling,
  flippedIndexes,
  onCardClick,
}) => {
  // Fixed grid classes and dimensions for each difficulty
  const gridConfig = {
    easy: {
      cols: "grid-cols-4",
      rows: "grid-rows-3",
      maxWidth: "max-w-[400px]",
      totalCells: 12
    },
    medium: {
      cols: "grid-cols-5",
      rows: "grid-rows-4",
      maxWidth: "max-w-[500px]",
      totalCells: 20
    },
    hard: {
      cols: "grid-cols-7",
      rows: "grid-rows-4",
      maxWidth: "max-w-[700px]",
      totalCells: 28
    }
  };

  // Create a shuffled array of indices for the animation sequence
  const shuffleIndices = React.useMemo(() => {
    return Array.from({ length: gridConfig[difficulty].totalCells }, (_, i) => i)
      .sort(() => Math.random() - 0.5);
  }, [isShuffling, difficulty]);

  // Calculate the number of empty placeholders to add based on difficulty
  const getPlaceholders = () => {
    const totalCells = gridConfig[difficulty].totalCells;
    // Return placeholders to fill the grid
    return Array.from({ length: Math.max(0, totalCells - cards.length) }, (_, i) => i);
  };

  const placeholders = getPlaceholders();

  return (
    <div
      className={cn(
        "grid gap-4 w-full mx-auto p-4",
        gridConfig[difficulty].cols,
        gridConfig[difficulty].rows,
        gridConfig[difficulty].maxWidth
      )}
      style={{
        perspective: 2000,
        minHeight: difficulty === 'easy' ? '360px' : difficulty === 'medium' ? '480px' : '480px'
      }}
    >
      {/* Real cards */}
      {cards.map((card, index) => (
        <motion.div
          key={`card-${card.id}-${index}`}
          initial={isShuffling ? { 
            scale: 1
          } : false}
          animate={isShuffling ? {
            rotateY: [0, 180, 360],
            scale: [1, 0.8, 1],
            x: [0, (shuffleIndices.indexOf(index) % 2 === 0 ? 30 : -30), 0],
            y: [0, (shuffleIndices.indexOf(index) % 3 === 0 ? 20 : -20), 0],
            z: [0, 50, 0],
            transition: {
              duration: 1,
              delay: index * 0.02, // Staggered timing for cards
              ease: [0.25, 0.1, 0.25, 1] // Custom cubic-bezier for smoother motion
            }
          } : {
            rotateY: 0,
            scale: 1,
            x: 0,
            y: 0,
            z: 0,
            transition: {
              duration: 0.5,
              ease: "easeOut"
            }
          }}
          style={{ 
            perspective: 1000,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden"
          }}
        >
          <Card
            value={card.value}
            isFlipped={flippedIndexes.includes(index) || card.isMatched}
            isMatched={card.isMatched}
            onClick={() => onCardClick(index)}
          />
        </motion.div>
      ))}

      {/* Empty placeholder slots to maintain grid layout */}
      {placeholders.map((placeholder) => (
        <div 
          key={`placeholder-${placeholder}-${difficulty}`}
          className="rounded-lg opacity-0 aspect-square"
        ></div>
      ))}
    </div>
  );
};

export default GameGrid;
