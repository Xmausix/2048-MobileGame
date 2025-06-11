import { GameState, MoveResult, Direction } from '@/types';

const BOARD_SIZE = 4;

export const initBoard = (): (number | null)[][] => {
  const board: (number | null)[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
  
  // Add two random tiles to start
  addRandomTile(board);
  addRandomTile(board);
  
  return board;
};

export const addRandomTile = (board: (number | null)[][]): void => {
  const emptyTiles: { row: number; col: number }[] = [];
  
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === null) {
        emptyTiles.push({ row, col });
      }
    }
  }
  
  if (emptyTiles.length > 0) {
    const randomIndex = Math.floor(Math.random() * emptyTiles.length);
    const { row, col } = emptyTiles[randomIndex];
    // 90% chance for 2, 10% chance for 4
    board[row][col] = Math.random() < 0.9 ? 2 : 4;
  }
};

const copyBoard = (board: (number | null)[][]): (number | null)[][] => {
  return board.map(row => [...row]);
};

const moveLeft = (board: (number | null)[][]): { board: (number | null)[][]; score: number; moved: boolean } => {
  const newBoard = copyBoard(board);
  let score = 0;
  let moved = false;

  for (let row = 0; row < BOARD_SIZE; row++) {
    // Filter out null values and slide left
    const nonNullTiles = newBoard[row].filter(tile => tile !== null) as number[];
    const merged = new Array(nonNullTiles.length).fill(false);
    
    // Merge adjacent tiles
    for (let i = 0; i < nonNullTiles.length - 1; i++) {
      if (nonNullTiles[i] === nonNullTiles[i + 1] && !merged[i] && !merged[i + 1]) {
        nonNullTiles[i] *= 2;
        score += nonNullTiles[i];
        nonNullTiles.splice(i + 1, 1);
        merged[i] = true;
      }
    }
    
    // Fill the row with merged tiles and nulls
    const newRow: (number | null)[] = [
      ...nonNullTiles,
      ...Array(BOARD_SIZE - nonNullTiles.length).fill(null)
    ];
    
    // Check if anything moved
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (newBoard[row][col] !== newRow[col]) {
        moved = true;
      }
    }
    
    newBoard[row] = newRow;
  }

  return { board: newBoard, score, moved };
};

const moveRight = (board: (number | null)[][]): { board: (number | null)[][]; score: number; moved: boolean } => {
  const newBoard = copyBoard(board);
  let score = 0;
  let moved = false;

  for (let row = 0; row < BOARD_SIZE; row++) {
    // Filter out null values and slide right
    const nonNullTiles = newBoard[row].filter(tile => tile !== null) as number[];
    const merged = new Array(nonNullTiles.length).fill(false);
    
    // Merge adjacent tiles from right to left
    for (let i = nonNullTiles.length - 1; i > 0; i--) {
      if (nonNullTiles[i] === nonNullTiles[i - 1] && !merged[i] && !merged[i - 1]) {
        nonNullTiles[i] *= 2;
        score += nonNullTiles[i];
        nonNullTiles.splice(i - 1, 1);
        merged[i] = true;
      }
    }
    
    // Fill the row with nulls and merged tiles
    const newRow: (number | null)[] = [
      ...Array(BOARD_SIZE - nonNullTiles.length).fill(null),
      ...nonNullTiles
    ];
    
    // Check if anything moved
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (newBoard[row][col] !== newRow[col]) {
        moved = true;
      }
    }
    
    newBoard[row] = newRow;
  }

  return { board: newBoard, score, moved };
};

const transposeBoard = (board: (number | null)[][]): (number | null)[][] => {
  const transposed: (number | null)[][] = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));
    
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      transposed[col][row] = board[row][col];
    }
  }
  
  return transposed;
};

const moveUp = (board: (number | null)[][]): { board: (number | null)[][]; score: number; moved: boolean } => {
  const transposed = transposeBoard(board);
  const result = moveLeft(transposed);
  return {
    ...result,
    board: transposeBoard(result.board)
  };
};

const moveDown = (board: (number | null)[][]): { board: (number | null)[][]; score: number; moved: boolean } => {
  const transposed = transposeBoard(board);
  const result = moveRight(transposed);
  return {
    ...result,
    board: transposeBoard(result.board)
  };
};

export const makeMove = (board: (number | null)[][], direction: Direction): MoveResult => {
  let result: { board: (number | null)[][]; score: number; moved: boolean };
  
  switch (direction) {
    case 'left':
      result = moveLeft(board);
      break;
    case 'right':
      result = moveRight(board);
      break;
    case 'up':
      result = moveUp(board);
      break;
    case 'down':
      result = moveDown(board);
      break;
    default:
      result = { board: copyBoard(board), score: 0, moved: false };
  }
  
  if (result.moved) {
    addRandomTile(result.board);
  }
  
  const gameOver = isGameOver(result.board);
  const won = has2048Tile(result.board);
  
  return {
    ...result,
    gameOver,
    won
  };
};

export const isGameOver = (board: (number | null)[][]): boolean => {
  // Check for empty cells
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === null) {
        return false;
      }
    }
  }
  
  // Check for possible merges
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const current = board[row][col];
      // Check right neighbor
      if (col < BOARD_SIZE - 1 && board[row][col + 1] === current) {
        return false;
      }
      // Check bottom neighbor
      if (row < BOARD_SIZE - 1 && board[row + 1][col] === current) {
        return false;
      }
    }
  }
  
  return true;
};

export const has2048Tile = (board: (number | null)[][]): boolean => {
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (board[row][col] === 2048) {
        return true;
      }
    }
  }
  return false;
};

export const calculateScore = (board: (number | null)[][]): number => {
  let score = 0;
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      const tile = board[row][col];
      if (tile) {
        score += tile;
      }
    }
  }
  return score;
};