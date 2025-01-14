import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';

interface CategorySelectorProps {
  onStart: () => void;
}

const CategorySelector = ({ onStart }: CategorySelectorProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8"
      >
        <h1 className="text-4xl font-bold mb-4">Memory Match X</h1>
        
        <Button
          onClick={onStart}
          className="w-full max-w-md h-16 text-lg"
          variant="default"
        >
          Play Game
        </Button>
      </motion.div>
    </div>
  );
};

export default CategorySelector;