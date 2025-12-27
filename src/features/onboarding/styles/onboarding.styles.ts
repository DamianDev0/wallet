import { StyleSheet } from 'react-native';
import { height, width } from '@utils/dimensios';
import { typography } from '@theme/config/typography';
import { spacing } from '@theme/config/spacing';
import { lightColors } from '@theme/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width,
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },

  image: {
    width: width * 2.1,
    height: height * 1,
    resizeMode: 'contain',
  },

  title: {
    ...typography.titles.xl,
    color: lightColors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },

  subtitle: {
    ...typography.body.md,
    color: lightColors.text,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    maxWidth: width * 0.85,
  },
});
