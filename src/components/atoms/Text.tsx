import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface TextProps extends RNTextProps {
  variant?: 'body' | 'heading' | 'title' | 'caption';
  color?: string;
  weight?: 'regular' | 'medium' | 'bold';
}

export const Text = ({
  variant = 'body',
  color,
  weight,
  style,
  children,
  ...props
}: TextProps) => {
  const { theme } = useTheme();

  const variantStyles = {
    body: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.regular as any,
    },
    heading: {
      fontSize: theme.typography.sizes.xl,
      fontWeight: theme.typography.weights.bold as any,
    },
    title: {
      fontSize: theme.typography.sizes.lg,
      fontWeight: theme.typography.weights.bold as any,
    },
    caption: {
      fontSize: theme.typography.sizes.sm,
      fontWeight: theme.typography.weights.regular as any,
    },
  };

  const weightStyles = weight
    ? { fontWeight: theme.typography.weights[weight] as any }
    : {};

  return (
    <RNText
      style={[
        styles.text,
        { color: color || theme.colors.text },
        variantStyles[variant],
        weightStyles,
        style,
      ]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
});
