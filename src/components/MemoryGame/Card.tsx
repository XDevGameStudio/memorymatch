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
        {/* Front of card */}
        <div
          className={cn(
            "absolute w-full h-full rounded-lg border-4 border-primary/40",
            "backface-hidden bg-background",
            isMatched && "opacity-50"
          )}
        />
        
        {/* Back of card */}
        <div
          className={cn(
            "absolute w-full h-full rounded-lg border-4 border-primary/40",
            "backface-hidden bg-secondary flex items-center justify-center",
            "rotate-y-180",
            isMatched && "opacity-50"
          )}
        >
          <Icon className="w-8 h-8 text-secondary-foreground" />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;