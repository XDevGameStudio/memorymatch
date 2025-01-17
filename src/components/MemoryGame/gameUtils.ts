import { Card, Difficulty } from './types';
import { 
  Heart, Star, Sun, Moon, Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy, Rocket, Bird, 
  Flower, Gift, Globe, Headphones, IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap, Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark, Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish, Flag, Flame, Gem, Guitar,
  AlarmClock, Aperture, Archive, Axe, Backpack, Box, Briefcase, Building,
  Bus, Calculator, Calendar, CandlestickChart, ChefHat, Cherry, Church,
  Citrus, Clover, Codesandbox, Coins, Cog,
  CreditCard, Croissant, Database, Dessert,
  Dna, Donut, Droplet, Egg, Eraser, Euro, Factory,
  Bot, Bike, Bone, Bed, Beef,
  // Adding more icons
  Airplay, Album, AlertCircle, AlertTriangle, 
  Armchair, ArrowDown, ArrowUp, AtSign,
  BatteryCharging, BellRing, Bluetooth, Bomb,
  Carrot, ChevronDown, ChevronUp, CircleDot,
  CloudRain, CloudSnow, Compass, Construction,
  DollarSign, Download, Feather, FileLock,
  Fingerprint, Fire, Footprints, Glasses,
  Hammer, HandMetal, Hexagon, HourglassIcon,
  Infinity, Joystick, Keyboard, Leaf,
  Lightbulb, Lock, Magnet, MessageCircle,
  Microphone, Monitor, Mountain, Mouse,
  Navigation, Newspaper, Octagon, Package,
  PaintBucket, Pencil, Phone, Printer,
  Puzzle, Radio, Ruler, Scissors,
  Send, Settings, Share, Shield,
  ShoppingBag, ShoppingCart, Smartphone, Snowflake,
  SunMoon, Syringe, Target, Terminal,
  ThumbsUp, Timer, Trash, Truck,
  Tv, Unlock, Upload, UsbStick,
  Variable, Video, Wallet, Watch,
  Wifi, Wind, Wrench, Yoga
} from 'lucide-react';

const allIcons = [
  Heart, Star, Sun, Moon, Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy, Rocket, Bird,
  Flower, Gift, Globe, Headphones, IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap, Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark, Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish, Flag, Flame, Gem, Guitar,
  AlarmClock, Aperture, Archive, Axe, Backpack, Box, Briefcase, Building,
  Bus, Calculator, Calendar, CandlestickChart, ChefHat, Cherry, Church,
  Citrus, Clover, Codesandbox, Coins, Cog,
  CreditCard, Croissant, Database, Dessert,
  Dna, Donut, Droplet, Egg, Eraser, Euro, Factory,
  Bot, Bike, Bone, Bed, Beef,
  // Adding the new icons to the array
  Airplay, Album, AlertCircle, AlertTriangle,
  Armchair, ArrowDown, ArrowUp, AtSign,
  BatteryCharging, BellRing, Bluetooth, Bomb,
  Carrot, ChevronDown, ChevronUp, CircleDot,
  CloudRain, CloudSnow, Compass, Construction,
  DollarSign, Download, Feather, FileLock,
  Fingerprint, Fire, Footprints, Glasses,
  Hammer, HandMetal, Hexagon, HourglassIcon,
  Infinity, Joystick, Keyboard, Leaf,
  Lightbulb, Lock, Magnet, MessageCircle,
  Microphone, Monitor, Mountain, Mouse,
  Navigation, Newspaper, Octagon, Package,
  PaintBucket, Pencil, Phone, Printer,
  Puzzle, Radio, Ruler, Scissors,
  Send, Settings, Share, Shield,
  ShoppingBag, ShoppingCart, Smartphone, Snowflake,
  SunMoon, Syringe, Target, Terminal,
  ThumbsUp, Timer, Trash, Truck,
  Tv, Unlock, Upload, UsbStick,
  Variable, Video, Wallet, Watch,
  Wifi, Wind, Wrench, Yoga
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