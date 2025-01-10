import { LucideIcon } from 'lucide-react';
import { 
  Cat, Dog, Rabbit, Fish, Bird, Turtle, Squirrel,
  Banana, Cake, Pizza, Sandwich,
  Computer, Smartphone, Tablet,
  Clapperboard,
  Guitar, Headphones,
  Rocket, Satellite,
  Leaf, TreeDeciduous, Flower,
  Sailboat, Waves,
  Sprout, LeafyGreen,
  Sun, Moon, Cloud, Rain, Snow, Tornado,
  Atom, Beaker, TestTube,
  Smile, Frown, Angry, Laugh,
  GraduationCap, Book,
  Hammer, Wrench, Scissors,
  Shirt
} from 'lucide-react';

export interface IconCategory {
  name: string;
  icons: LucideIcon[];
}

export const iconCategories: IconCategory[] = [
  {
    name: "Animals",
    icons: [Cat, Dog, Rabbit, Fish, Bird, Turtle, Squirrel]
  },
  {
    name: "Food",
    icons: [Banana, Cake, Pizza, Sandwich]
  },
  {
    name: "Tech",
    icons: [Computer, Smartphone, Tablet]
  },
  {
    name: "Entertainment",
    icons: [Clapperboard, Guitar, Headphones]
  },
  {
    name: "Space",
    icons: [Rocket, Satellite]
  },
  {
    name: "Nature",
    icons: [Leaf, TreeDeciduous, Flower]
  },
  {
    name: "Ocean",
    icons: [Sailboat, Waves, Fish]
  },
  {
    name: "Plants",
    icons: [Sprout, LeafyGreen]
  },
  {
    name: "Weather",
    icons: [Sun, Moon, Cloud, Rain, Snow, Tornado]
  },
  {
    name: "Science",
    icons: [Atom, Beaker, TestTube]
  },
  {
    name: "Emotions",
    icons: [Smile, Frown, Angry, Laugh]
  },
  {
    name: "Education",
    icons: [GraduationCap, Book]
  },
  {
    name: "Tools",
    icons: [Hammer, Wrench, Scissors]
  },
  {
    name: "Clothes",
    icons: [Shirt]
  }
];