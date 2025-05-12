// Board is represented as an array of 9 cells (null | 'X' | 'O')
export type Cell = 'X' | 'O' | null;
export type Board = Cell[];
export type GameStatus = 'playing' | 'won' | 'draw';

// Winning combinations
export const WINNING_COMBINATIONS = [
  [0, 1, 2], // top row
  [3, 4, 5], // middle row
  [6, 7, 8], // bottom row
  [0, 3, 6], // left column
  [1, 4, 7], // middle column
  [2, 5, 8], // right column
  [0, 4, 8], // diagonal top-left to bottom-right
  [2, 4, 6], // diagonal top-right to bottom-left
];

/**
 * Creates an empty board
 */
export function createEmptyBoard(): Board {
  return Array(9).fill(null);
}

/**
 * Checks if a player has won the game
 * Returns the winning player ('X' or 'O') or null if no winner
 */
export function checkWinner(board: Board): Cell {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

/**
 * Gets the winning combination if there is a winner
 * Returns the winning indexes or null if no winner
 */
export function getWinningCombo(board: Board): number[] | null {
  for (const combo of WINNING_COMBINATIONS) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return combo;
    }
  }
  return null;
}

/**
 * Checks if the board is full (no null cells)
 */
export function isBoardFull(board: Board): boolean {
  return board.every(cell => cell !== null);
}

/**
 * Gets the current status of the game
 */
export function getGameStatus(board: Board): GameStatus {
  const winner = checkWinner(board);
  if (winner) {
    return 'won';
  }
  if (isBoardFull(board)) {
    return 'draw';
  }
  return 'playing';
}

/**
 * Get best move for AI (simple algorithm)
 * Returns the index for the best move
 */
export function getBestMove(board: Board, aiPlayer: 'X' | 'O'): number {
  const humanPlayer = aiPlayer === 'X' ? 'O' : 'X';
  const availableMoves = board.reduce<number[]>((moves, cell, index) => {
    if (cell === null) moves.push(index);
    return moves;
  }, []);

  // Try to win
  for (const index of availableMoves) {
    const newBoard = [...board];
    newBoard[index] = aiPlayer;
    if (checkWinner(newBoard) === aiPlayer) {
      return index;
    }
  }

  // Block opponent from winning
  for (const index of availableMoves) {
    const newBoard = [...board];
    newBoard[index] = humanPlayer;
    if (checkWinner(newBoard) === humanPlayer) {
      return index;
    }
  }

  // Take center if available
  if (availableMoves.includes(4)) {
    return 4;
  }

  // Take corners if available
  const corners = [0, 2, 6, 8].filter(corner => availableMoves.includes(corner));
  if (corners.length > 0) {
    return corners[Math.floor(Math.random() * corners.length)];
  }

  // Take any available move
  return availableMoves[Math.floor(Math.random() * availableMoves.length)];
}