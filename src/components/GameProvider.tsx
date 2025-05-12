import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Player, 
  BoardState, 
  GameStatus, 
  createEmptyBoard, 
  checkWinner, 
  checkDraw,
  getGameStatus,
  getBestMove
} from '../utils/gameUtils';

interface GameContextType {
  board: BoardState;
  currentPlayer: Player;
  winner: Player;
  gameStatus: GameStatus;
  winningCombo: number[] | null;
  makeMove: (index: number) => void;
  resetGame: () => void;
  aiMove: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export default function GameProvider({ children }: GameProviderProps) {
  const [board, setBoard] = useState<BoardState>(createEmptyBoard());
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winningCombo, setWinningCombo] = useState<number[] | null>(null);
  
  // Reset game function
  const resetGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPlayer('X');
    setGameStatus('playing');
    setWinningCombo(null);
  };
  
  // Find winning combination if game is won
  const findWinningCombo = (board: BoardState): number[] | null => {
    // Import WINNING_COMBINATIONS from gameUtils
    const WINNING_COMBINATIONS = [
      [0, 1, 2], // Top row
      [3, 4, 5], // Middle row
      [6, 7, 8], // Bottom row
      [0, 3, 6], // Left column
      [1, 4, 7], // Middle column
      [2, 5, 8], // Right column
      [0, 4, 8], // Diagonal from top-left
      [2, 4, 6], // Diagonal from top-right
    ];
    
    for (const combo of WINNING_COMBINATIONS) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return combo;
      }
    }
    return null;
  };
  
  // Make a move
  const makeMove = (index: number) => {
    // Return if cell is already filled or game is over
    if (board[index] !== null || gameStatus !== 'playing') return;
    
    // Create new board with the move
    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    
    // Check game status after move
    const status = getGameStatus(newBoard);
    setGameStatus(status);
    
    // Set winning combo if game is won
    if (status === 'won') {
      setWinningCombo(findWinningCombo(newBoard));
    }
    
    // Switch player if game continues
    if (status === 'playing') {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };
  
  // AI makes a move
  const aiMove = () => {
    if (gameStatus !== 'playing' || currentPlayer !== 'O') return;
    
    const bestMove = getBestMove(board, 'O');
    makeMove(bestMove);
  };
  
  const winner = checkWinner(board);
  
  const value = {
    board,
    currentPlayer,
    winner,
    gameStatus,
    winningCombo,
    makeMove,
    resetGame,
    aiMove,
  };
  
  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};