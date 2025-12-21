import { StyleSheet } from 'react-native';
import { width } from '@utils/dimensios';

export const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
    color: '#111111',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    maxWidth: width * 0.85,
    alignSelf: 'center',
    lineHeight: 24,
  },
});
