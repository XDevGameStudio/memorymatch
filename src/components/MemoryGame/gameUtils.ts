import { Card, Difficulty } from './types';

const getDeckSize = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 12; // 4x3 grid = 12 cards
    case 'medium':
      return 20; // 4x5 grid = 20 cards
    case 'hard':
      return 28; // 4x7 grid = 28 cards
    default:
      return 12;
  }
};

export const createDeck = (difficulty: Difficulty): Card[] => {
  const deckSize = getDeckSize(difficulty);
  const pairs = deckSize / 2;
  
  const values = Array.from({ length: pairs }, (_, i) => i.toString());
  const deck = [...values, ...values].map((value, index) => ({
    id: index,
    value,
    isFlipped: false,
    isMatched: false
  }));

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
};