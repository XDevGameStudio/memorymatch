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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  onHelp: () => void;
}

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 flex gap-2 z-50"
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded"
        onClick={() => setShowHelp(true)}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded">
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
        <DropdownMenuContent align="end" className="rounded">
          <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("candy")}>Candy</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("sunset")}>Sunset</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("forest")}>Forest</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="rounded fixed right-4 top-16 w-80">
          <h2 className="text-lg font-bold mb-2">How to Play Tic Tac Toe X</h2>
          <ol className="list-decimal pl-4">
            <li>Choose to play against AI or another player</li>
            <li>Take turns placing X's and O's on the board</li>
            <li>Get three in a row to win</li>
            <li>Block your opponent from getting three in a row</li>
            <li>Have fun!</li>
          </ol>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default ThemeSelector;