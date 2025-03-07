
import { Button } from "@/components/ui/button";
import { Moon, Sun, Palette } from "lucide-react";
import { Theme } from "@/hooks/use-theme";

interface MemoryThemeSelectorProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const MemoryThemeSelector = ({ theme, setTheme }: MemoryThemeSelectorProps) => {
  const themes: Theme[] = ["light", "dark", "candy", "sunset", "forest"];
  const nextTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  return (
    <div className="fixed top-4 right-4 z-10">
      <Button 
        variant="outline" 
        size="icon" 
        className="rounded-full" 
        onClick={nextTheme}
      >
        {theme === "light" && <Sun className="h-4 w-4" />}
        {theme === "dark" && <Moon className="h-4 w-4" />}
        {(theme === "candy" || theme === "sunset" || theme === "forest") && <Palette className="h-4 w-4" />}
      </Button>
    </div>
  );
};

export default MemoryThemeSelector;
