import { Button } from "@/components/ui/button";
import { HelpCircle, Sun, Moon, Candy, Sunset, TreePine } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Theme } from "@/hooks/use-theme";
import { motion } from "framer-motion";

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onHelp: () => void;
}

const ThemeSelector = ({ theme, setTheme, onHelp }: ThemeSelectorProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute top-4 right-4 flex gap-2"
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-none"
        onClick={onHelp}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-none">
            {theme === "dark" ? (
              <Moon className="h-4 w-4" />
            ) : theme === "candy" ? (
              <Candy className="h-4 w-4" />
            ) : theme === "sunset" ? (
              <Sunset className="h-4 w-4" />
            ) : theme === "forest" ? (
              <TreePine className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-none">
          <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("candy")}>Candy</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("sunset")}>Sunset</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("forest")}>Forest</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
};

export default ThemeSelector;