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
        initial={isShuffling ? { 
          scale: 0.95,
          opacity: 0.8,
          rotateX: -15,
          rotateY: -15,
          z: -100
        } : false}
        animate={{ 
          scale: 1, 
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          transition: {
            duration: 0.8,
            ease: [0.4, 0, 0.2, 1]
          }
        }}
        exit={{ 
          scale: 0.95, 
          opacity: 0.8,
          rotateX: 15,
          rotateY: 15,
          z: -100,
          transition: {
            duration: 0.6,
            ease: [0.4, 0, 1, 1]
          }
        }}
        style={{
          perspective: 2000,
          transformStyle: "preserve-3d"
        }}
      >
        {cards.map((card, index) => (
          <motion.div
            key={card.id}
            initial={isShuffling ? { 
              scale: 0,
              rotateY: -180,
              rotateX: Math.random() * 360 - 180,
              opacity: 0,
              z: -200
            } : false}
            animate={{ 
              scale: 1,
              rotateY: 0,
              rotateX: 0,
              opacity: 1,
              z: 0,
              transition: {
                duration: 0.8,
                delay: isShuffling ? index * 0.06 : 0,
                ease: [0.34, 1.56, 0.64, 1],
                rotateY: {
                  duration: 1,
                  ease: [0.34, 1.56, 0.64, 1]
                },
                rotateX: {
                  duration: 1,
                  ease: [0.34, 1.56, 0.64, 1]
                }
              }
            }}
            style={{ 
              perspective: 1000,
              transformStyle: "preserve-3d"
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