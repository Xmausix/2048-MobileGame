import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { runOnJS } from 'react-native-reanimated';
import { Tile } from './Tile';
import { useGame } from '@/context/GameContext';
import { Direction } from '@/types';
import { colors, globalStyles } from '@/styles/theme';

const { width: screenWidth } = Dimensions.get('window');
const BOARD_PADDING = 20;
const TILE_MARGIN = 8;
const BOARD_SIZE = screenWidth - (BOARD_PADDING * 2);
const TILE_SIZE = (BOARD_SIZE - (TILE_MARGIN * 5)) / 4;

export const GameBoard: React.FC = () => {
  const { gameState, move } = useGame();

  const handleMove = (direction: Direction) => {
    move(direction);
  };

  const panGesture = Gesture.Pan()
    .onEnd((event) => {
      const { translationX, translationY } = event;
      const absX = Math.abs(translationX);
      const absY = Math.abs(translationY);
      
      // Minimum distance for gesture recognition
      const minDistance = 30;
      
      if (absX < minDistance && absY < minDistance) {
        return;
      }
      
      if (absX > absY) {
        // Horizontal movement
        if (translationX > 0) {
          runOnJS(handleMove)('right');
        } else {
          runOnJS(handleMove)('left');
        }
      } else {
        // Vertical movement
        if (translationY > 0) {
          runOnJS(handleMove)('down');
        } else {
          runOnJS(handleMove)('up');
        }
      }
    });

  const renderTile = (value: number | null, row: number, col: number) => {
    const left = col * (TILE_SIZE + TILE_MARGIN) + TILE_MARGIN;
    const top = row * (TILE_SIZE + TILE_MARGIN) + TILE_MARGIN;
    
    return (
      <View
        key={`${row}-${col}`}
        style={[
          styles.tilePosition,
          {
            left,
            top,
            width: TILE_SIZE,
            height: TILE_SIZE,
          }
        ]}
      >
        <Tile
          value={value}
          position={{ row, col }}
          size={TILE_SIZE}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <GestureDetector gesture={panGesture}>
        <View style={[styles.board, globalStyles.shadow]}>
          {/* Background grid */}
          {Array.from({ length: 4 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => (
              <View
                key={`bg-${row}-${col}`}
                style={[
                  styles.backgroundTile,
                  {
                    left: col * (TILE_SIZE + TILE_MARGIN) + TILE_MARGIN,
                    top: row * (TILE_SIZE + TILE_MARGIN) + TILE_MARGIN,
                    width: TILE_SIZE,
                    height: TILE_SIZE,
                  }
                ]}
              />
            ))
          )}
          
          {/* Game tiles */}
          {gameState.board.map((row, rowIndex) =>
            row.map((value, colIndex) =>
              renderTile(value, rowIndex, colIndex)
            )
          )}
        </View>
      </GestureDetector>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: BOARD_PADDING,
  },
  
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    backgroundColor: colors.gridBackground,
    borderRadius: 12,
    position: 'relative',
  },
  
  backgroundTile: {
    position: 'absolute',
    backgroundColor: colors.tileBackground,
    borderRadius: 8,
    opacity: 0.7,
  },
  
  tilePosition: {
    position: 'absolute',
  },
});