import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Cpu, Ghost, Heart, Star,
  Sun, Moon, Cloud, ArrowRight,
  Music, Coffee, Pizza, Camera 
} from 'lucide-react';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, isMatched, onClick }) => {
  const iconMap = {
    '0': Cpu,
    '1': Ghost,
    '2': Heart,
    '3': Star,
    '4': Sun,
    '5': Moon,
    '6': Cloud,
    '7': ArrowRight,
    '8': Music,
    '9': Coffee,
    '10': Pizza,
    '11': Camera
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