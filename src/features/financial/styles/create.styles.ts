import { StyleSheet } from 'react-native';
import { Theme } from '@theme/types';
import { width } from '@utils/dimensios';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: width * 0.08,
    },
    welcomeSection: {
      marginBottom: 32,
    },
    title: {
      marginBottom: 12,
    },
    description: {
      opacity: 0.7,

    },
    imageContainer: {
      alignItems: 'center',
      marginBottom: 32,
    },
    image: {
      width: width * 0.7,
      height: width * 0.8
      
    },
    benefitsContainer: {
      marginBottom: 32,
    },
    benefitItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
    },
    benefitIcon: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: theme.colors.successBackground,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    benefitText: {
      flex: 1,
      color: theme.colors.text,
    },
    buttonContainer: {
      paddingHorizontal: 24,
      paddingBottom: 32,
    },
    widgetContainer: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    widgetHeader: {
      paddingHorizontal: 20,
      paddingVertical: 16,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border,
    },
    widgetContent: {
      flex: 1,
    },
  });
