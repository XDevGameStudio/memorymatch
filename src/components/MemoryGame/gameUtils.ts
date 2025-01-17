import { 
  Heart, Star, Sun, Moon, 
  Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy,
  Rocket, Bird, Crown, Diamond,
  Flower, Gift, Globe, Headphones,
  IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap,
  Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark,
  Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Compass,
  Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish,
  Flag, Flame, Gem, Guitar
} from 'lucide-react';

const allIcons = [
  Heart, Star, Sun, Moon, Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy, Rocket, Bird, Crown, Diamond,
  Flower, Gift, Globe, Headphones, IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap, Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark, Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Compass, Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish, Flag, Flame, Gem, Guitar
];

const getDeckSize = (difficulty: Difficulty): number => {
  switch (difficulty) {
    case 'easy':
      return 12;
    case 'medium':
      return 20;
    case 'hard':
      return 28;
    default:
      return 12;
  }
};

export const createDeck = (difficulty: Difficulty): Card[] => {
  const deckSize = getDeckSize(difficulty);
  const pairs = deckSize / 2;
  
  // Shuffle and select random icons
  const shuffledIcons = [...allIcons]
    .sort(() => Math.random() - 0.5)
    .slice(0, pairs);
  
  // Create pairs of cards
  const deck = [...Array(deckSize)].map((_, index) => {
    const iconIndex = Math.floor(index / 2);
    return {
      id: index,
      value: iconIndex.toString(),
      isFlipped: false,
      isMatched: false
    };
  });

  // Shuffle the deck
  return deck.sort(() => Math.random() - 0.5);
};