import React from 'react';
import { cn } from '@/lib/utils';
import Card from './Card';
import { Card as CardType, Difficulty } from './types';
import { motion } from 'framer-motion';

interface GameBoardProps {
  cards: CardType[];
  difficulty: Difficulty;
  flippedIndexes: number[];
  handleCardClick: (index: number) => void;
}

const GameBoard = ({ cards, difficulty, flippedIndexes, handleCardClick }: GameBoardProps) => {
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
    <div className={cn(
      "grid gap-4 w-full mx-auto p-4",
      gridSizeClass[difficulty],
      getGridHeight(difficulty)
    )}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          value={card.value}
          isFlipped={flippedIndexes.includes(index) || card.isMatched}
          isMatched={card.isMatched}
          onClick={() => handleCardClick(index)}
        />
      ))}
    </div>
  );
};

export default GameBoard;