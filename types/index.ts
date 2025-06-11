export interface GameState {
  board: (number | null)[][];
  score: number;
  bestScore: number;
  gameOver: boolean;
  won: boolean;
  canUndo: boolean;
}

export interface Position {
  row: number;
  col: number;
}

export interface TileProps {
  value: number | null;
  position: Position;
  size: number;
  isNew?: boolean;
  merged?: boolean;
}

export type Direction = 'up' | 'down' | 'left' | 'right';

export interface MoveResult {
  board: (number | null)[][];
  score: number;
  moved: boolean;
  gameOver: boolean;
  won: boolean;
}