import { height, width } from '@utils/dimensios';
import { StyleSheet } from 'react-native';
import { typography } from '@theme/config/typography';
import { spacing } from '@theme/config/spacing';
import { sizes } from '@theme/config/sizes';
import { darkColors } from '@theme/colors/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconWrapper: {
    width: width,
    height: height * 0.45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },

  title: {
    fontSize: typography.sizes.title,
    fontWeight: String(typography.weights.bold) as '700',
    color: darkColors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },

  subtitle: {
    fontSize: typography.sizes.md,
    fontWeight: String(typography.weights.regular) as '400',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    lineHeight: typography.sizes.lg,
    maxWidth: width * 0.85,
  },

  skipButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: sizes.borderRadius.md,
    marginHorizontal: spacing.md,
  },

  skipText: {
    color: darkColors.text,
    fontSize: typography.sizes.sm,
    fontWeight: String(typography.weights.medium) as '500',
  },

  nextButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: sizes.borderRadius.md,
    marginHorizontal: spacing.md,
  },

  doneButton: {
    backgroundColor: darkColors.background,
    paddingVertical: spacing.md,
    borderRadius: sizes.borderRadius.lg,
    width: width * 0.9,
    position: 'absolute',
    bottom: -spacing.lg,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },

  buttonText: {
    color: darkColors.text,
    fontSize: typography.sizes.md,
    fontWeight: String(typography.weights.medium) as '500',
    textAlign: 'center',
  },
});
