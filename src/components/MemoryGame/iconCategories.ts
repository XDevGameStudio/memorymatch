import { LucideIcon } from 'lucide-react';
import { 
  // Food icons
  Pizza, Sandwich, Cake, IceCream, Apple, Cookie, Coffee, Beer, Wine, Soup,
  
  // Tech icons
  Smartphone, Laptop, Monitor, Keyboard, Mouse, Printer, Wifi, Bluetooth, Battery, Cpu,
  
  // Entertainment icons
  Music, Headphones, Radio, Tv, Film, Camera, GamepadTwo, Dice, Cards, Palette,
  
  // Space icons
  Rocket, Star, Moon, Sun, Satellite, Telescope, Atom, Comet,
  
  // Nature icons
  Tree, Flower, Leaf, Cloud, Mountain, Waves, Wind, Rainbow,
  
  // Ocean icons
  Anchor, Ship, Fish, Shell, Compass, Map,
  
  // Weather icons
  CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning, Wind as WindIcon,
  
  // Science icons
  Flask, TestTubes, Microscope, Dna, Brain, Virus,
  
  // Emotions icons
  Smile, Laugh, Frown, Angry, Meh, Heart,
  
  // Education icons
  GraduationCap, Book, Library, Pencil, Ruler, Calculator,
  
  // Tools icons
  Hammer, Wrench, Screwdriver, Drill, Saw, Scissors,
  
  // Clothes icons
  Shirt, Shoes, Hat, Glasses, Watch, Ring
} from 'lucide-react';

export interface IconCategory {
  name: string;
  icons: LucideIcon[];
}

export const iconCategories: IconCategory[] = [
  {
    name: "Food & Drinks",
    icons: [Pizza, Sandwich, Cake, IceCream, Apple, Cookie, Coffee, Beer, Wine, Soup]
  },
  {
    name: "Technology",
    icons: [Smartphone, Laptop, Monitor, Keyboard, Mouse, Printer, Wifi, Bluetooth, Battery, Cpu]
  },
  {
    name: "Entertainment",
    icons: [Music, Headphones, Radio, Tv, Film, Camera, GamepadTwo, Dice, Cards, Palette]
  },
  {
    name: "Space",
    icons: [Rocket, Star, Moon, Sun, Satellite, Telescope, Atom, Comet]
  },
  {
    name: "Nature",
    icons: [Tree, Flower, Leaf, Cloud, Mountain, Waves, Wind, Rainbow]
  },
  {
    name: "Ocean",
    icons: [Anchor, Ship, Fish, Shell, Compass, Map]
  },
  {
    name: "Weather",
    icons: [CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning, WindIcon]
  },
  {
    name: "Science",
    icons: [Flask, TestTubes, Microscope, Dna, Brain, Virus]
  },
  {
    name: "Emotions",
    icons: [Smile, Laugh, Frown, Angry, Meh, Heart]
  },
  {
    name: "Education",
    icons: [GraduationCap, Book, Library, Pencil, Ruler, Calculator]
  },
  {
    name: "Tools",
    icons: [Hammer, Wrench, Screwdriver, Drill, Saw, Scissors]
  },
  {
    name: "Fashion",
    icons: [Shirt, Shoes, Hat, Glasses, Watch, Ring]
  }
];