import { motion } from "framer-motion";

const GameHeader = () => {
  return (
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="text-4xl font-bold mb-8 mt-12"
    >
      Tic Tac Toe X
    </motion.h1>
  );
};

export default GameHeader;