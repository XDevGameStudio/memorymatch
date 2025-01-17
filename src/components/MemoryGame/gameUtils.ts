import { Card, Difficulty } from './types';
import { 
  Heart, Star, Sun, Moon, Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy, Rocket, Bird, Crown, Diamond,
  Flower, Gift, Globe, Headphones, IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap, Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark, Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Compass, Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish, Flag, Flame, Gem, Guitar,
  AlarmClock, Aperture, Archive, Axe, Backpack, Baggage, Balloon, Bandage,
  Bed, Beef, Bike, Bone, Boot, Box, Briefcase, Building,
  Bus, Calculator, Calendar, CandlestickChart, ChefHat, Cherry, ChocolateBar, Church,
  Circus, Citrus, Clover, Codesandbox, Coins, Cog, Coins, Compass,
  CreditCard, Croissant, Crown, Cube, Database, Dessert, Diamond, Dice,
  Dna, Donut, Door, Droplet, Egg, Eraser, Euro, Factory
} from 'lucide-react';

const allIcons = [
  Heart, Star, Sun, Moon, Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy, Rocket, Bird, Crown, Diamond,
  Flower, Gift, Globe, Headphones, IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap, Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark, Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Compass, Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish, Flag, Flame, Gem, Guitar,
  AlarmClock, Aperture, Archive, Axe, Backpack, Baggage, Balloon, Bandage,
  Bed, Beef, Bike, Bone, Boot, Box, Briefcase, Building,
  Bus, Calculator, Calendar, CandlestickChart, ChefHat, Cherry, ChocolateBar, Church,
  Circus, Citrus, Clover, Codesandbox, Coins, Cog, Coins, Compass,
  CreditCard, Croissant, Crown, Cube, Database, Dessert, Diamond, Dice,
  Dna, Donut, Door, Droplet, Egg, Eraser, Euro, Factory
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