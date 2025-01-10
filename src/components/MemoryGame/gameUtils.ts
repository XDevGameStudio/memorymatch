import { Card, Difficulty } from './types';
import { iconCategories } from './iconCategories';

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
  
  // Get random category if none selected
  const category = iconCategories[Math.floor(Math.random() * iconCategories.length)];
  
  // Get random icons from the category
  const selectedIcons = [...category.icons]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairs);
  
  // Create pairs of cards
  const deck = [...selectedIcons, ...selectedIcons].map((Icon, index) => ({
    id: index,
    value: Icon.name, // Use icon name as value
    isFlipped: false,
    isMatched: false
  }));

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
};