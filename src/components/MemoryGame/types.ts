import { LucideIcon } from 'lucide-react';

export interface Card {
  id: number;
  value: string;
  icon?: LucideIcon;
  isFlipped: boolean;
  isMatched: boolean;
}

export type Difficulty = 'easy' | 'medium' | 'hard';