import React from 'react';
import { motion } from 'framer-motion';
import Card from './Card';
import { Card as CardType, Difficulty } from './types';

interface GameGridProps {
  cards: CardType[];
  difficulty: Difficulty;
  isShuffling: boolean;
  flippedIndexes: number[];
  onCardClick: (index: number) => void;
}

const GameGrid = ({ cards, difficulty, isShuffling, flippedIndexes, onCardClick }: GameGridProps) => {
  const gridConfig = {
    easy: 'grid-cols-3',
    medium: 'grid-cols-4',
    hard: 'grid-cols-5'
  };

  const shuffleAnimation = {
    initial: { scale: 1, rotate: 0 },
    animate: isShuffling ? { 
      scale: [1, 0.8, 1],
      rotate: [0, 360, 0],
      transition: { 
        duration: 0.5,
        ease: "easeInOut"
      }
    } : {},
  };

  return (
    <motion.div 
      className={`grid ${gridConfig[difficulty]} gap-2 w-full max-w-[600px]`}
      variants={shuffleAnimation}
      initial="initial"
      animate="animate"
    >
      {cards.map((card, index) => (
        <Card
          key={index}
          card={card}
          isFlipped={flippedIndexes.includes(index)}
          onClick={() => onCardClick(index)}
        />
      ))}
    </motion.div>
  );
};

export default GameGrid;