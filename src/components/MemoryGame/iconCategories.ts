import { LucideIcon } from 'lucide-react';
import { 
  // Food icons
  Pizza, Apple, Coffee, Beer, Wine, Soup,
  
  // Tech icons
  Smartphone, Laptop, Monitor, Keyboard, Mouse, Printer, Wifi, Bluetooth, Battery, Cpu,
  
  // Entertainment icons
  Music, Headphones, Radio, Tv, Film, Camera, Gamepad, Dice1, Palette,
  
  // Space icons
  Rocket, Star, Moon, Sun, Satellite,
  
  // Nature icons
  Trees, Flower, Leaf, Cloud, Mountain, Waves, Wind, Rainbow,
  
  // Ocean icons
  Anchor, Ship, Fish, Compass, Map,
  
  // Weather icons
  CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning, 
  
  // Science icons
  TestTubes, Microscope, Dna, Brain,
  
  // Emotions icons
  Smile, Laugh, Frown, Angry, Meh, Heart,
  
  // Education icons
  GraduationCap, Book, Library, Pencil, Ruler, Calculator,
  
  // Tools icons
  Hammer, Wrench, Drill, Scissors,
  
  // Clothes icons
  Shirt, Watch, Glasses
} from 'lucide-react';

export interface IconCategory {
  name: string;
  icons: LucideIcon[];
}

export const iconCategories: IconCategory[] = [
  {
    name: "Food & Drinks",
    icons: [Pizza, Apple, Coffee, Beer, Wine, Soup]
  },
  {
    name: "Technology",
    icons: [Smartphone, Laptop, Monitor, Keyboard, Mouse, Printer, Wifi, Bluetooth, Battery, Cpu]
  },
  {
    name: "Entertainment",
    icons: [Music, Headphones, Radio, Tv, Film, Camera, Gamepad, Dice1, Palette]
  },
  {
    name: "Space",
    icons: [Rocket, Star, Moon, Sun, Satellite]
  },
  {
    name: "Nature",
    icons: [Trees, Flower, Leaf, Cloud, Mountain, Waves, Wind, Rainbow]
  },
  {
    name: "Ocean",
    icons: [Anchor, Ship, Fish, Compass, Map]
  },
  {
    name: "Weather",
    icons: [CloudSun, CloudMoon, CloudRain, CloudSnow, CloudLightning]
  },
  {
    name: "Science",
    icons: [TestTubes, Microscope, Dna, Brain]
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
    icons: [Hammer, Wrench, Drill, Scissors]
  },
  {
    name: "Fashion",
    icons: [Shirt, Watch, Glasses]
  }
];