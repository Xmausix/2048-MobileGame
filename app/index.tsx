import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { GameProvider } from '@/context/GameContext';
import { Header } from '@/components/Header';
import { GameBoard } from '@/components/GameBoard';
import { GameOverModal } from '@/components/GameOverModal';
import { globalStyles } from '@/styles/theme';

export default function GameScreen() {
  return (
    <GameProvider>
      <SafeAreaView style={[globalStyles.container, styles.container]}>
        <View style={styles.content}>
          <Header />
          <GameBoard />
        </View>
        <GameOverModal />
      </SafeAreaView>
    </GameProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  content: {
    flex: 1,
  },
});