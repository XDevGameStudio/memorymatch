import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, isMatched, onClick }) => {
  const icons = [
    LucideIcons.Cpu, LucideIcons.Ghost, LucideIcons.Heart, LucideIcons.Star,
    LucideIcons.Sun, LucideIcons.Moon, LucideIcons.Cloud, LucideIcons.ArrowRight,
    LucideIcons.Music, LucideIcons.Coffee, LucideIcons.Pizza, LucideIcons.Camera
  ];
  
  const Icon = icons[parseInt(value)];

  return (
    <motion.button
      whileHover={{ scale: isFlipped ? 1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "w-full aspect-square rounded-lg text-4xl font-bold flex items-center justify-center",
        "transition-all duration-200",
        "border border-primary/20",
        isFlipped ? "bg-primary/10" : "bg-background hover:bg-primary/5",
        isMatched && "opacity-50"
      )}
      onClick={onClick}
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        className="w-full h-full flex items-center justify-center"
      >
        {isFlipped && <Icon className="w-8 h-8" />}
      </motion.div>
    </motion.button>
  );
};

export default Card;