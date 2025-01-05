import { Card } from './types';
import { Cpu, Ghost, Heart, Star, Sun, Moon, Cloud, ArrowRight, Music, Coffee, Pizza, Camera } from 'lucide-react';

const icons = [Cpu, Ghost, Heart, Star, Sun, Moon, Cloud, ArrowRight, Music, Coffee, Pizza, Camera];

export const createDeck = (difficulty: 'easy' | 'medium' | 'hard'): Card[] => {
  const pairCounts = {
    easy: 6,
    medium: 8,
    hard: 12
  };

  const pairs = pairCounts[difficulty];
  const selectedIcons = icons.slice(0, pairs);
  
  const cards: Card[] = [];
  selectedIcons.forEach((_, index) => {
    // Create pairs of cards
    for (let i = 0; i < 2; i++) {
      cards.push({
        id: cards.length,
        value: index.toString(),
        isFlipped: false,
        isMatched: false
      });
    }
  });

  // Shuffle the cards
  return cards.sort(() => Math.random() - 0.5);
};