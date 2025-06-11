import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { TileProps } from '@/types';
import { getTileColor, globalStyles } from '@/styles/theme';

export const Tile: React.FC<TileProps> = ({ 
  value, 
  position, 
  size, 
  isNew = false, 
  merged = false 
}) => {
  const scale = useSharedValue(isNew ? 0 : 1);
  const opacity = useSharedValue(1);
  const { background, text } = getTileColor(value);

  useEffect(() => {
    if (isNew) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 200,
      });
    } else if (merged) {
      scale.value = withSequence(
        withSpring(1.1, { damping: 15, stiffness: 200 }),
        withSpring(1, { damping: 15, stiffness: 200 })
      );
    }
  }, [isNew, merged]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const tileStyle = [
    styles.tile,
    globalStyles.shadow,
    {
      width: size,
      height: size,
      backgroundColor: background,
    }
  ];

  const textStyle = [
    styles.tileText,
    {
      color: text,
      fontSize: getFontSize(value, size),
    }
  ];

  if (!value) {
    return (
      <View style={[tileStyle, styles.emptyTile]} />
    );
  }

  return (
    <Animated.View style={[tileStyle, animatedStyle]}>
      <Text style={textStyle}>{value}</Text>
    </Animated.View>
  );
};

const getFontSize = (value: number | null, tileSize: number): number => {
  if (!value) return 0;
  
  const baseSize = tileSize * 0.35;
  
  if (value < 100) return baseSize;
  if (value < 1000) return baseSize * 0.85;
  if (value < 10000) return baseSize * 0.7;
  return baseSize * 0.6;
};

const styles = StyleSheet.create({
  tile: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  
  emptyTile: {
    opacity: 0.3,
  },
  
  tileText: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});