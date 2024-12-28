import { motion } from "framer-motion";

interface PauseOverlayProps {
  onResume: () => void;
}

const PauseOverlay = ({ onResume }: PauseOverlayProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-md z-10 flex items-center justify-center cursor-pointer"
      onClick={onResume}
    >
      <div className="text-2xl font-bold">Game Paused</div>
    </motion.div>
  );
};

export default PauseOverlay;