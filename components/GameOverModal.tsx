import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { Trophy, RotateCcw } from 'lucide-react-native';
import { useGame } from '@/context/GameContext';
import { colors, globalStyles } from '@/styles/theme';

export const GameOverModal: React.FC = () => {
  const { gameState, restart } = useGame();

  if (!gameState.gameOver && !gameState.won) {
    return null;
  }

  const isWin = gameState.won && !gameState.gameOver;

  return (
    <Modal
      visible={gameState.gameOver || gameState.won}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={[styles.modal, globalStyles.shadow]}>
          <View style={styles.iconContainer}>
            <Trophy 
              size={64} 
              color={isWin ? '#f59563' : colors.text} 
            />
          </View>
          
          <Text style={styles.title}>
            {isWin ? 'You Win!' : 'Game Over!'}
          </Text>
          
          <Text style={styles.subtitle}>
            {isWin 
              ? 'Congratulations! You reached 2048!' 
              : 'No more moves available.'
            }
          </Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Final Score</Text>
            <Text style={styles.scoreValue}>{gameState.score}</Text>
          </View>
          
          <TouchableOpacity 
            style={[globalStyles.button, styles.restartButton]} 
            onPress={restart}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <RotateCcw size={18} color={colors.buttonText} />
              <Text style={[globalStyles.buttonText, styles.buttonText]}>
                Try Again
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  
  modal: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    minWidth: 280,
  },
  
  iconContainer: {
    marginBottom: 20,
  },
  
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.8,
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
  },
  
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  
  scoreLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    opacity: 0.8,
    marginBottom: 4,
  },
  
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
  },
  
  restartButton: {
    minWidth: 140,
  },
  
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  buttonText: {
    fontSize: 16,
  },
});