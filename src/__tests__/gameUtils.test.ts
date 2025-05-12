import {
  createEmptyBoard,
  checkWinner,
  getWinningCombo,
  isBoardFull,
  getGameStatus,
  getBestMove,
  type Board
} from '../utils/gameUtils';

describe('Game Utilities', () => {
  describe('createEmptyBoard', () => {
    test('should create an empty board with 9 null cells', () => {
      const board = createEmptyBoard();
      expect(board).toHaveLength(9);
      expect(board.every(cell => cell === null)).toBe(true);
    });
  });

  describe('checkWinner', () => {
    test('should return null when there is no winner', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      expect(checkWinner(board)).toBeNull();
    });

    test('should return X when X has a winning row', () => {
      const board: Board = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null
      ];
      expect(checkWinner(board)).toBe('X');
    });

    test('should return O when O has a winning column', () => {
      const board: Board = [
        'X', 'O', 'X',
        'X', 'O', null,
        null, 'O', null
      ];
      expect(checkWinner(board)).toBe('O');
    });

    test('should return X when X has a winning diagonal', () => {
      const board: Board = [
        'X', 'O', null,
        'O', 'X', null,
        null, 'O', 'X'
      ];
      expect(checkWinner(board)).toBe('X');
    });
  });

  describe('getWinningCombo', () => {
    test('should return null when there is no winning combo', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      expect(getWinningCombo(board)).toBeNull();
    });

    test('should return the winning combo indexes for a row', () => {
      const board: Board = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null
      ];
      expect(getWinningCombo(board)).toEqual([0, 1, 2]);
    });

    test('should return the winning combo indexes for a column', () => {
      const board: Board = [
        'X', 'O', 'X',
        'X', 'O', null,
        'X', 'O', null
      ];
      expect(getWinningCombo(board)).toEqual([0, 3, 6]);
    });

    test('should return the winning combo indexes for a diagonal', () => {
      const board: Board = [
        'X', 'O', null,
        'O', 'X', null,
        null, 'O', 'X'
      ];
      expect(getWinningCombo(board)).toEqual([0, 4, 8]);
    });
  });

  describe('isBoardFull', () => {
    test('should return false when board has empty cells', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', null
      ];
      expect(isBoardFull(board)).toBe(false);
    });

    test('should return true when board is completely filled', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', 'O',
        'O', 'X', 'O'
      ];
      expect(isBoardFull(board)).toBe(true);
    });
  });

  describe('getGameStatus', () => {
    test('should return "playing" when game is in progress', () => {
      const board: Board = [
        'X', 'O', 'X',
        'O', 'X', null,
        null, null, null
      ];
      expect(getGameStatus(board)).toBe('playing');
    });

    test('should return "won" when there is a winner', () => {
      const board: Board = [
        'X', 'X', 'X',
        'O', 'O', null,
        null, null, null
      ];
      expect(getGameStatus(board)).toBe('won');
    });

    test('should return "draw" when board is full with no winner', () => {
      const board: Board = [
        'X', 'O', 'X',
        'X', 'O', 'X',
        'O', 'X', 'O'
      ];
      expect(getGameStatus(board)).toBe('draw');
    });
  });

  describe('getBestMove', () => {
    test('should choose winning move when available', () => {
      const board: Board = [
        'O', null, 'O',
        null, 'X', null,
        'X', null, null
      ];
      // AI is 'O' and should choose position 1 to win
      expect(getBestMove(board, 'O')).toBe(1);
    });

    test('should block opponent from winning', () => {
      const board: Board = [
        'X', 'X', null,
        null, 'O', null,
        null, null, null
      ];
      // AI is 'O' and should block X from winning by choosing position 2
      expect(getBestMove(board, 'O')).toBe(2);
    });

    test('should take center if available', () => {
      const board: Board = [
        'X', null, null,
        null, null, null,
        null, null, null
      ];
      // AI should take center (position 4)
      expect(getBestMove(board, 'O')).toBe(4);
    });

    test('should take a corner if center and no winning/blocking moves', () => {
      const board: Board = [
        null, null, null,
        null, 'X', null,
        null, null, null
      ];
      // AI should take one of the corners [0, 2, 6, 8]
      const move = getBestMove(board, 'O');
      expect([0, 2, 6, 8]).toContain(move);
    });
  });
});