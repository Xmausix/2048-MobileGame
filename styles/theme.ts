import { StyleSheet } from 'react-native';

export const colors = {
  background: '#faf8ef',
  gridBackground: '#bbada0',
  tileBackground: '#cdc1b4',
  text: '#776e65',
  textLight: '#f9f6f2',
  textDark: '#776e65',
  button: '#8f7a66',
  buttonText: '#f9f6f2',
  score: '#eee4da',
  
  // Tile colors
  tile2: '#eee4da',
  tile4: '#ede0c8',
  tile8: '#f2b179',
  tile16: '#f59563',
  tile32: '#f67c5f',
  tile64: '#f65e3b',
  tile128: '#edcf72',
  tile256: '#edcc61',
  tile512: '#edc850',
  tile1024: '#edc53f',
  tile2048: '#edc22e',
  tileSuper: '#3c3a32',
};

export const getTileColor = (value: number | null): { background: string; text: string } => {
  if (!value) {
    return { background: colors.tileBackground, text: colors.textDark };
  }
  
  switch (value) {
    case 2: return { background: colors.tile2, text: colors.textDark };
    case 4: return { background: colors.tile4, text: colors.textDark };
    case 8: return { background: colors.tile8, text: colors.textLight };
    case 16: return { background: colors.tile16, text: colors.textLight };
    case 32: return { background: colors.tile32, text: colors.textLight };
    case 64: return { background: colors.tile64, text: colors.textLight };
    case 128: return { background: colors.tile128, text: colors.textLight };
    case 256: return { background: colors.tile256, text: colors.textLight };
    case 512: return { background: colors.tile512, text: colors.textLight };
    case 1024: return { background: colors.tile1024, text: colors.textLight };
    case 2048: return { background: colors.tile2048, text: colors.textLight };
    default: return { background: colors.tileSuper, text: colors.textLight };
  }
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  
  button: {
    backgroundColor: colors.button,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  
  buttonText: {
    color: colors.buttonText,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});