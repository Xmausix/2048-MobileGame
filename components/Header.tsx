import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { RotateCcw } from 'lucide-react-native';
import { useGame } from '@/context/GameContext';
import { colors, globalStyles } from '@/styles/theme';

export const Header: React.FC = () => {
  const { gameState, restart } = useGame();

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>2048</Text>
        <Text style={styles.subtitle}>Join the tiles, get to 2048!</Text>
      </View>
      
      <View style={styles.scoreContainer}>
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>SCORE</Text>
          <Text style={styles.scoreValue}>{gameState.score}</Text>
        </View>
        
        <View style={styles.scoreBox}>
          <Text style={styles.scoreLabel}>BEST</Text>
          <Text style={styles.scoreValue}>{gameState.bestScore}</Text>
        </View>
      </View>
      
      <TouchableOpacity 
        style={[globalStyles.button, styles.restartButton]} 
        onPress={restart}
        activeOpacity={0.8}
      >
        <View style={styles.buttonContent}>
          <RotateCcw size={18} color={colors.buttonText} />
          <Text style={[globalStyles.buttonText, styles.restartText]}>
            New Game
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  
  titleContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  
  subtitle: {
    fontSize: 16,
    color: colors.text,
    opacity: 0.8,
  },
  
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 20,
  },
  
  scoreBox: {
    backgroundColor: colors.score,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
    ...globalStyles.shadow,
  },
  
  scoreLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
  },
  
  scoreValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text,
  },
  
  restartButton: {
    alignSelf: 'center',
    minWidth: 120,
  },
  
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  
  restartText: {
    fontSize: 14,
  },
});