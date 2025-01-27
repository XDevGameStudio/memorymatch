import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { 
  Heart, Star, Sun, Moon, Cloud, Music, Coffee, Pizza,
  Camera, Ghost, Gamepad, Trophy, Rocket, Bird,
  Flower, Globe, Headphones, IceCream, Key, Laptop, Map,
  Palette, Rainbow, Umbrella, Anchor, Apple, Award, Baby,
  Banana, Bell, Book, Bookmark, Brain, Brush, Bug, Cake,
  Car, Cat, Clock, Cookie, Cpu, Dice1, Dog,
  Drum, Eye, Fan, Fish, Flag, Gem, Guitar,
  AlarmClock, Aperture, Archive, Axe, Backpack, Box, Briefcase, Building,
  Bus, Calculator, Calendar, CandlestickChart, ChefHat, Cherry, Church,
  Citrus, Clover, Codesandbox, Coins, Cog,
  CreditCard, Croissant, Database, Dessert,
  Dna, Donut, Droplet, Egg, Eraser, Euro, Factory,
  Bot, Bike, Bone, Bed, Beef,
  Airplay, Album, AlertCircle, AlertTriangle,
  Armchair, ArrowDown, ArrowUp, AtSign,
  BatteryCharging, BellRing, Bluetooth, Bomb,
  Carrot, ChevronDown, ChevronUp, CircleDot,
  CloudRain, CloudSnow, Compass, Construction,
  DollarSign, Download, Feather, FileLock,
  Fingerprint, Footprints,
  Hammer, Hexagon, Home,
  Infinity, Joystick, Keyboard, Leaf,
  Lightbulb, Lock, Magnet, MessageCircle,
  Mail, Monitor, Mountain, Mouse,
  Navigation, Newspaper, Octagon, Package,
  PaintBucket, Pencil, Phone, Printer,
  Puzzle, Radio, Ruler, Scissors,
  Send, Settings, Share, Shield,
  ShoppingBag, ShoppingCart, Smartphone, Snowflake,
  SunMoon, Syringe, Target, Terminal,
  ThumbsUp, Timer, Trash, Truck,
  Tv, Unlock, Upload, User,
  Variable, Video, Wallet, Watch,
  Wifi, Wind, Wrench
} from 'lucide-react';

interface CardProps {
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ value, isFlipped, isMatched, onClick }) => {
  const iconMap: { [key: string]: React.ComponentType<any> } = {
    '0': Heart, '1': Star, '2': Sun, '3': Moon, '4': Cloud, '5': Music, '6': Coffee, '7': Pizza,
    '8': Camera, '9': Ghost, '10': Gamepad, '11': Trophy, '12': Rocket, '13': Bird,
    '14': Flower, '15': Globe, '16': Headphones, '17': IceCream, '18': Key, '19': Laptop, '20': Map,
    '21': Palette, '22': Rainbow, '23': Umbrella, '24': Anchor, '25': Apple, '26': Award, '27': Baby,
    '28': Banana, '29': Bell, '30': Book, '31': Bookmark, '32': Brain, '33': Brush, '34': Bug, '35': Cake,
    '36': Car, '37': Cat, '38': Clock, '39': Cookie, '40': Cpu, '41': Dice1, '42': Dog,
    '43': Drum, '44': Eye, '45': Fan, '46': Fish, '47': Flag, '48': Gem, '49': Guitar,
    '50': AlarmClock, '51': Aperture, '52': Archive, '53': Axe, '54': Backpack, '55': Box, '56': Briefcase,
    '57': Building, '58': Bus, '59': Calculator, '60': Calendar, '61': CandlestickChart, '62': ChefHat,
    '63': Cherry, '64': Church, '65': Citrus, '66': Clover, '67': Codesandbox, '68': Coins, '69': Cog,
    '70': CreditCard, '71': Croissant, '72': Database, '73': Dessert, '74': Dna, '75': Donut,
    '76': Droplet, '77': Egg, '78': Eraser, '79': Euro, '80': Factory, '81': Bot, '82': Bike,
    '83': Bone, '84': Bed, '85': Beef, '86': Airplay, '87': Album, '88': AlertCircle,
    '89': AlertTriangle, '90': Armchair, '91': ArrowDown, '92': ArrowUp, '93': AtSign,
    '94': BatteryCharging, '95': BellRing, '96': Bluetooth, '97': Bomb, '98': Carrot,
    '99': ChevronDown, '100': ChevronUp, '101': CircleDot, '102': CloudRain, '103': CloudSnow,
    '104': Compass, '105': Construction, '106': DollarSign, '107': Download, '108': Feather,
    '109': FileLock, '110': Fingerprint, '111': Footprints, '112': Hammer, '113': Hexagon,
    '114': Home, '115': Infinity, '116': Joystick, '117': Keyboard, '118': Leaf,
    '119': Lightbulb, '120': Lock, '121': Magnet, '122': MessageCircle, '123': Mail,
    '124': Monitor, '125': Mountain, '126': Mouse, '127': Navigation, '128': Newspaper,
    '129': Octagon, '130': Package, '131': PaintBucket, '132': Pencil, '133': Phone,
    '134': Printer, '135': Puzzle, '136': Radio, '137': Ruler, '138': Scissors,
    '139': Send, '140': Settings, '141': Share, '142': Shield, '143': ShoppingBag,
    '144': ShoppingCart, '145': Smartphone, '146': Snowflake, '147': SunMoon,
    '148': Syringe, '149': Target, '150': Terminal, '151': ThumbsUp, '152': Timer,
    '153': Trash, '154': Truck, '155': Tv, '156': Unlock, '157': Upload,
    '158': User, '159': Variable, '160': Video, '161': Wallet, '162': Watch,
    '163': Wifi, '164': Wind, '165': Wrench
  };
  
  const Icon = iconMap[value];
  
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
          {Icon && <Icon strokeWidth={2} size={32} color="currentColor" className="text-primary-foreground" />}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Card;