import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameState, Direction } from '@/types';
import { initBoard, makeMove, calculateScore } from '@/utils/gameLogic';

interface GameContextType {
  gameState: GameState;
  move: (direction: Direction) => void;
  restart: () => void;
  setBestScore: (score: number) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

type GameAction =
  | { type: 'MOVE'; direction: Direction }
  | { type: 'RESTART' }
  | { type: 'SET_BEST_SCORE'; score: number }
  | { type: 'LOAD_BEST_SCORE'; score: number };

const initialState: GameState = {
  board: initBoard(),
  score: 0,
  bestScore: 0,
  gameOver: false,
  won: false,
  canUndo: false,
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'MOVE': {
      if (state.gameOver) return state;
      
      const result = makeMove(state.board, action.direction);
      const newScore = state.score + result.score;
      const newBestScore = Math.max(state.bestScore, newScore);
      
      return {
        ...state,
        board: result.board,
        score: newScore,
        bestScore: newBestScore,
        gameOver: result.gameOver,
        won: result.won,
        canUndo: result.moved,
      };
    }
    
    case 'RESTART': {
      return {
        ...initialState,
        board: initBoard(),
        bestScore: state.bestScore,
      };
    }
    
    case 'SET_BEST_SCORE': {
      return {
        ...state,
        bestScore: action.score,
      };
    }
    
    case 'LOAD_BEST_SCORE': {
      return {
        ...state,
        bestScore: action.score,
      };
    }
    
    default:
      return state;
  }
};

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // Load best score on app start
  useEffect(() => {
    const loadBestScore = async () => {
      try {
        const storedBestScore = await AsyncStorage.getItem('bestScore');
        if (storedBestScore) {
          dispatch({ type: 'LOAD_BEST_SCORE', score: parseInt(storedBestScore, 10) });
        }
      } catch (error) {
        console.error('Failed to load best score:', error);
      }
    };
    
    loadBestScore();
  }, []);

  // Save best score when it changes
  useEffect(() => {
    const saveBestScore = async () => {
      try {
        await AsyncStorage.setItem('bestScore', gameState.bestScore.toString());
      } catch (error) {
        console.error('Failed to save best score:', error);
      }
    };
    
    if (gameState.bestScore > 0) {
      saveBestScore();
    }
  }, [gameState.bestScore]);

  const move = (direction: Direction) => {
    dispatch({ type: 'MOVE', direction });
  };

  const restart = () => {
    dispatch({ type: 'RESTART' });
  };

  const setBestScore = (score: number) => {
    dispatch({ type: 'SET_BEST_SCORE', score });
  };

  const contextValue: GameContextType = {
    gameState,
    move,
    restart,
    setBestScore,
  };

  return (
    <GameContext.Provider value={contextValue}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};