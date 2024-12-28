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
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeSelector = ({ theme, setTheme }: ThemeSelectorProps) => {
  const [showHelp, setShowHelp] = useState(false);

  const themeIcons = {
    light: <Sun className="h-4 w-4" />,
    dark: <Moon className="h-4 w-4" />,
    candy: <Candy className="h-4 w-4" />,
    sunset: <Sunset className="h-4 w-4" />,
    forest: <TreePine className="h-4 w-4" />
  };

  const themeLabels = {
    light: "Light",
    dark: "Dark",
    candy: "Candy",
    sunset: "Sunset",
    forest: "Forest"
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed top-4 right-4 flex gap-2 z-50"
    >
      <Button
        variant="outline"
        size="icon"
        className="rounded-lg bg-background/80 backdrop-blur-sm hover:bg-accent"
        onClick={() => setShowHelp(true)}
      >
        <HelpCircle className="h-4 w-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="rounded-lg bg-background/80 backdrop-blur-sm hover:bg-accent">
            {themeIcons[theme]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="rounded-lg">
          {(Object.keys(themeIcons) as Theme[]).map((t) => (
            <DropdownMenuItem 
              key={t}
              onClick={() => setTheme(t)} 
              className={cn(
                "gap-2 cursor-pointer flex items-center",
                theme === t && "bg-accent"
              )}
            >
              {themeIcons[t]}
              <span>{themeLabels[t]}</span>
              {theme === t && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-2 h-2 rounded-full bg-primary ml-auto"
                />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showHelp} onOpenChange={setShowHelp}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogTitle>How to Play Tic Tac Toe X</DialogTitle>
          <ol className="list-decimal pl-4 space-y-2">
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