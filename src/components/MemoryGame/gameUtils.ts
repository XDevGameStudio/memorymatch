import { Card, Difficulty } from './types';
import { IconCategory } from './iconCategories';

const getDeckSize = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 12; // 3x4 grid = 12 cards
    case 'medium':
      return 20; // 4x5 grid = 20 cards
    case 'hard':
      return 28; // 4x7 grid = 28 cards
    default:
      return 12;
  }
};

export const createDeck = (difficulty: Difficulty, category: IconCategory): Card[] => {
  const deckSize = getDeckSize(difficulty);
  const pairs = deckSize / 2;
  
  // Get random icons from the category
  const selectedIcons = [...category.icons]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairs);
  
  // Create pairs of cards
  const deck = [...Array(deckSize)].map((_, index) => {
    const iconIndex = Math.floor(index / 2);
    return {
      id: index,
      value: iconIndex.toString(), // Use index as value for matching pairs
      isFlipped: false,
      isMatched: false
    };
  });

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
};