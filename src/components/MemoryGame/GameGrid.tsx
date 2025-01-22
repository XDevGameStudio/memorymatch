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

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isShuffling ? 'shuffling' : 'stable'}
        className={cn(
          "grid gap-4 w-full mx-auto p-4",
          gridSizeClass[difficulty],
          getGridHeight(difficulty)
        )}
        initial={isShuffling ? { scale: 0.8, opacity: 0 } : false}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={isShuffling ? { scale: 0, rotateY: 180 } : false}
            animate={{ 
              scale: 1, 
              rotateY: 0,
            }}
            transition={{
              duration: 0.4,
              delay: isShuffling ? index * 0.05 : 0,
              ease: "easeOut"
            }}
            style={{ 
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
      </motion.div>
    </AnimatePresence>
  );
};

export default GameGrid;