// Types for game state
export type Player = 'X' | 'O' | null;
export type BoardState = (Player)[];
export type GameStatus = 'playing' | 'won' | 'draw';

// Winning combinations (row, column, diagonal)
export const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal from top-left
  [2, 4, 6], // Diagonal from top-right
];

// Initial empty board
export const createEmptyBoard = (): BoardState => Array(9).fill(null);

// Check if a player has won
export const checkWinner = (board: BoardState): Player => {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

// Check if the game is a draw
export const checkDraw = (board: BoardState): boolean => {
  return board.every(cell => cell !== null);
};

// Check game status
export const getGameStatus = (board: BoardState): GameStatus => {
  const winner = checkWinner(board);
  if (winner) return 'won';
  if (checkDraw(board)) return 'draw';
  return 'playing';
};

// AI move using minimax algorithm (for harder AI)
export const getBestMove = (board: BoardState, player: Player): number => {
  // Find empty cells
  const emptyCells = board.reduce((cells: number[], cell, index) => {
    if (cell === null) cells.push(index);
    return cells;
  }, []);
  
  // Simple strategy for now (can be improved with minimax)
  // 1. Win if possible
  // 2. Block opponent from winning
  // 3. Take center
  // 4. Take corner
  // 5. Take any open space
  
  const opponent = player === 'X' ? 'O' : 'X';
  
  // Try to win
  for (const index of emptyCells) {
    const newBoard = [...board];
    newBoard[index] = player;
    if (checkWinner(newBoard) === player) {
      return index;
    }
  }
  
  // Block opponent
  for (const index of emptyCells) {
    const newBoard = [...board];
    newBoard[index] = opponent;
    if (checkWinner(newBoard) === opponent) {
      return index;
    }
  }
  
  // Take center
  if (emptyCells.includes(4)) return 4;
  
  // Take corner
  const corners = [0, 2, 6, 8].filter(idx => emptyCells.includes(idx));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }
  
  // Take any open space
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
};