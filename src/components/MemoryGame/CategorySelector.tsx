import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconCategory } from './iconCategories';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface CategorySelectorProps {
  categories: IconCategory[];
  onSelectCategory: (category: IconCategory) => void;
}

const CategorySelector = ({ categories, onSelectCategory }: CategorySelectorProps) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center gap-8"
      >
        <h1 className="text-4xl font-bold mb-4">Memory Match X</h1>
        
        <div className="relative w-full max-w-md mb-8">
          <Input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        </div>

        <Button
          onClick={() => {
            const randomCategory = categories[Math.floor(Math.random() * categories.length)];
            onSelectCategory(randomCategory);
          }}
          className="w-full max-w-md mb-8 h-16 text-lg"
          variant="outline"
        >
          Random Mode
        </Button>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {filteredCategories.map((category) => (
            <motion.div
              key={category.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => onSelectCategory(category)}
                variant="outline"
                className="w-full h-24 text-lg font-medium hover:bg-primary/10"
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CategorySelector;