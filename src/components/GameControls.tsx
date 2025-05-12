import { motion } from 'framer-motion';
import { useGame } from './GameProvider';
import { useEffect } from 'react';

interface GameControlsProps {
  gameMode: 'player' | 'ai';
  onChangeModeClick: () => void;
}

export default function GameControls({ gameMode, onChangeModeClick }: GameControlsProps) {
  const { resetGame, gameStatus, currentPlayer, aiMove } = useGame();
  
  // AI move effect
  useEffect(() => {
    if (gameMode === 'ai' && currentPlayer === 'O' && gameStatus === 'playing') {
      // Simulate thinking time for AI
      const timer = setTimeout(() => {
        aiMove();
      }, 700);
      
      return () => clearTimeout(timer);
    }
  }, [currentPlayer, gameMode, gameStatus, aiMove]);
  
  return (
    <div className="mt-8">
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <motion.button
          className="btn-primary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            // Reset the game explicitly
            resetGame();
            // Force a browser reflow to ensure the game resets
            setTimeout(() => {}, 0);
          }}
        >
          New Game
        </motion.button>
        
        <motion.button
          className="btn-secondary"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onChangeModeClick();
            // Reset game when switching modes
            resetGame();
          }}
        >
          Switch to {gameMode === 'player' ? 'AI' : 'Two Players'}
        </motion.button>
      </div>
      
      {gameMode === 'ai' && (
        <motion.p 
          className="text-center text-sm text-indigo-700 mt-4 bg-indigo-50 py-2 px-4 rounded-md inline-block mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          You are playing as X against the AI
        </motion.p>
      )}
    </div>
  );
}