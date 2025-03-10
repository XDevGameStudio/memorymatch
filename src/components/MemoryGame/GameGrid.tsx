
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
  // Fixed grid classes for each difficulty to maintain consistent dimensions
  const gridSizeClass = {
    easy: "grid-cols-4 max-w-[400px]",
    medium: "grid-cols-5 max-w-[500px]",
    hard: "grid-cols-7 max-w-[700px]"
  };

  const getGridHeight = (difficulty: Difficulty) => {
    switch (difficulty) {
      case 'easy': return 'grid-rows-3';
      case 'medium': return 'grid-rows-4';
      case 'hard': return 'grid-rows-4';
      default: return 'grid-rows-4';
    }
  };

  // Calculate the total number of cells based on difficulty
  const getTotalCells = (difficulty: Difficulty): number => {
    switch (difficulty) {
      case 'easy': return 12;
      case 'medium': return 20;
      case 'hard': return 28;
      default: return 20;
    }
  };

  // Create a shuffled array of indices for the animation sequence
  const shuffleIndices = React.useMemo(() => {
    const totalCells = getTotalCells(difficulty);
    return Array.from({ length: totalCells }, (_, i) => i)
      .sort(() => Math.random() - 0.5);
  }, [isShuffling, difficulty]);

  // Generate placeholder cards when actual cards aren't available yet
  const placeholderCards = React.useMemo(() => {
    const totalCells = getTotalCells(difficulty);
    const emptyCount = Math.max(0, totalCells - cards.length);
    
    return Array.from({ length: emptyCount }, (_, i) => ({
      id: -1 - i, // Negative IDs to distinguish from real cards
      value: '',
      isFlipped: false,
      isMatched: false
    }));
  }, [cards.length, difficulty]);

  // Combine real cards with placeholders to maintain grid size
  const displayCards = [...cards, ...placeholderCards];

  return (
    <div
      className={cn(
        "grid gap-4 w-full mx-auto p-4",
        gridSizeClass[difficulty],
        getGridHeight(difficulty)
      )}
      style={{
        perspective: 2000,
      }}
    >
      {displayCards.map((card, index) => {
        const isPlaceholder = card.id < 0;
        
        return (
          <motion.div
            key={`card-${card.id}-${difficulty}`}
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
            {!isPlaceholder ? (
              <Card
                value={card.value}
                isFlipped={flippedIndexes.includes(index) || card.isMatched}
                isMatched={card.isMatched}
                onClick={() => onCardClick(index)}
              />
            ) : (
              <div className="rounded-lg opacity-0 w-full h-full"></div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default GameGrid;
