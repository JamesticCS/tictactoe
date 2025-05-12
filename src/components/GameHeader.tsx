import { motion, AnimatePresence } from 'framer-motion';
import { useGame } from './GameProvider';

interface GameHeaderProps {
  gameMode: 'player' | 'ai';
}

export default function GameHeader({ gameMode }: GameHeaderProps) {
  const { currentPlayer, gameStatus, winner } = useGame();
  
  // Get the status message
  const getStatusMessage = () => {
    if (gameStatus === 'won') {
      return `Player ${winner} wins!`;
    } else if (gameStatus === 'draw') {
      return "It's a draw!";
    } else {
      return gameMode === 'player' 
        ? `Player ${currentPlayer}'s turn` 
        : currentPlayer === 'X' 
          ? "Your turn" 
          : "AI is thinking...";
    }
  };
  
  // Get the appropriate color for the current state
  const getStatusColor = () => {
    if (gameStatus === 'won') {
      return winner === 'X' ? 'text-rose-600' : 'text-green-600';
    } else if (gameStatus === 'draw') {
      return 'text-amber-600';
    } else {
      return currentPlayer === 'X' ? 'text-rose-600' : 'text-green-600';
    }
  };
  
  return (
    <header className="text-center mb-6">
      <h1 className="text-3xl font-bold mb-3 text-indigo-800">
        TicTacToe
      </h1>
      
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 text-sm font-medium rounded-full">
          {gameMode === 'player' ? 'Two Players' : 'vs AI'}
        </span>
      </div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={getStatusMessage()}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`text-xl font-medium ${getStatusColor()} font-bold`}
        >
          {getStatusMessage()}
        </motion.div>
      </AnimatePresence>
    </header>
  );
}