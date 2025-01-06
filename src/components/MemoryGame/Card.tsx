import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Heart, Star, Sun, Moon, 
  Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy,
  Rocket, Bird, Crown, Diamond,
  Flower, Gift, Globe, Headphones,
  IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Zap
} from 'lucide-react';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, isMatched, onClick }) => {
  const iconMap = {
    '0': Heart,
    '1': Star,
    '2': Sun,
    '3': Moon,
    '4': Cloud,
    '5': Music,
    '6': Coffee,
    '7': Pizza,
    '8': Camera,
    '9': Ghost,
    '10': Gamepad,
    '11': Trophy,
    '12': Rocket,
    '13': Bird,
    '14': Crown,
    '15': Diamond,
    '16': Flower,
    '17': Gift,
    '18': Globe,
    '19': Headphones,
    '20': IceCream,
    '21': Key,
    '22': Laptop,
    '23': Map,
    '24': Palette,
    '25': Rainbow,
    '26': Umbrella,
    '27': Zap
  };

  const Icon = iconMap[value as keyof typeof iconMap];
  
  return (
    <motion.div
      className="relative w-full aspect-square cursor-pointer"
      onClick={onClick}
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.div
        className="w-full h-full"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (face down) */}
        <div
          className={cn(
            "absolute w-full h-full rounded-lg border-2 border-border",
            "backface-hidden bg-background",
            isMatched && "opacity-50"
          )}
        />
        
        {/* Back of card (face up) */}
        <div
          className={cn(
            "absolute w-full h-full rounded-lg border-2 border-border",
            "backface-hidden bg-primary flex items-center justify-center",
            "rotate-y-180",
            isMatched && "opacity-50"
          )}
        >
          {Icon && <Icon className="w-8 h-8 text-primary-foreground" />}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;