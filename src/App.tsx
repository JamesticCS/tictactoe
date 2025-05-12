import { useState } from 'react';
import { motion } from 'framer-motion';
import GameBoard from './components/GameBoard';
import GameHeader from './components/GameHeader';
import GameControls from './components/GameControls';
import GameProvider from './components/GameProvider';
import AboutDialog from './components/AboutDialog';

function App() {
  const [gameMode, setGameMode] = useState<'player' | 'ai'>('player');
  
  return (
    <GameProvider>
      <div className="min-h-screen flex flex-col p-4 sm:p-6 items-center justify-center">
        <AboutDialog />
        
        <motion.main 
          className="max-w-md w-full game-container my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <GameHeader gameMode={gameMode} />
          <GameBoard />
          <GameControls 
            gameMode={gameMode} 
            onChangeModeClick={() => setGameMode(gameMode === 'player' ? 'ai' : 'player')} 
          />
        </motion.main>
        
        <footer className="mt-4 text-center text-sm text-white">
          <p>Jesse Hines © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </GameProvider>
  );
}

export default App;