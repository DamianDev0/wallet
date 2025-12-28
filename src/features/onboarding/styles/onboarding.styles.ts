import { StyleSheet } from 'react-native';
import { height, width } from '@utils/dimensios';
import { typography } from '@theme/config/typography';
import { spacing } from '@theme/config/spacing';

export const createOnboardingStyles = (theme: any) => StyleSheet.create({
  // Main container styles
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },

  onboardingContainer: {
    flex: 1,
  },

  imageContainer: {
    paddingBottom: 0,
  },

  // Page content styles
  pageContainer: {
    flex: 1,
    backgroundColor: theme.colors.background,
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
    width: width * 1.5,
    height: height * 1,
    resizeMode: 'contain',
  },

  title: {
    ...typography.titles.xl,
    color: theme.colors.text,
    marginBottom: spacing.md,
    textAlign: 'center',
    paddingHorizontal: spacing.lg,
  },

  subtitle: {
    ...typography.body.md,
    color: theme.colors.text,
    opacity: 0.7,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
    maxWidth: width * 0.85,
  },

  // Button styles
  doneButtonContainer: {
    width: width * 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  doneButton: {
    width: width * 0.9,
  },
});
