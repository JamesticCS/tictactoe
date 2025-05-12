import { motion } from 'framer-motion';
import { useGame } from './GameProvider';

export default function GameBoard() {
  const { board, makeMove, winningCombo } = useGame();
  
  // Animation variants
  const boardVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const cellVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
  };
  
  // Cell content animations
  const xMarkVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } },
  };
  
  const oMarkVariants = {
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } },
  };
  
  // Render cell content (X, O, or empty)
  const renderCellContent = (value: string | null, index: number) => {
    const isWinningCell = winningCombo?.includes(index);
    
    if (value === 'X') {
      return (
        <motion.svg 
          width="60" 
          height="60" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isWinningCell ? "#e11d48" : "#e11d48"} // Red color
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial="initial"
          animate="animate"
          className={isWinningCell ? "scale-110" : ""}
        >
          <motion.line x1="18" y1="6" x2="6" y2="18" variants={xMarkVariants} />
          <motion.line x1="6" y1="6" x2="18" y2="18" variants={xMarkVariants} />
        </motion.svg>
      );
    } else if (value === 'O') {
      return (
        <motion.svg 
          width="60" 
          height="60" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke={isWinningCell ? "#16a34a" : "#16a34a"} // Green color
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          initial="initial"
          animate="animate"
          className={isWinningCell ? "scale-110" : ""}
        >
          <motion.circle cx="12" cy="12" r="8" variants={oMarkVariants} />
        </motion.svg>
      );
    }
    
    return null;
  };
  
  return (
    <motion.div 
      className="game-board my-8"
      variants={boardVariants}
      initial="hidden"
      animate="visible"
    >
      {board.map((value, index) => {
        // Determine winning cell style based on the player
        let winningStyle = '';
        if (winningCombo?.includes(index)) {
          if (board[index] === 'X') {
            winningStyle = 'border-rose-500 bg-rose-50';
          } else {
            winningStyle = 'border-green-500 bg-green-50';
          }
        }
        
        return (
          <motion.div
            key={index}
            className={`game-cell ${winningStyle}`}
            variants={cellVariants}
            whileHover={{ scale: 0.95 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => makeMove(index)}
          >
            {renderCellContent(value, index)}
          </motion.div>
        );
      })}
    </motion.div>
  );
}