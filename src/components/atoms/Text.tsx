import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '@contexts/ThemeContext';

type TextVariant =
  | 'title-xxl'
  | 'title-xl'
  | 'title-lg'
  | 'title-md'
  | 'title-sm'
  | 'body-lg'
  | 'body-md'
  | 'body-sm'
  | 'body-xs'
  | 'numeric-xxl'
  | 'numeric-xl'
  | 'numeric-lg'
  | 'numeric-md'
  | 'numeric-sm'
  | 'button'
  | 'label'
  | 'caption';

type FontWeight =
  | 'thin'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

interface TextProps extends RNTextProps {
  variant?: TextVariant;
  color?: string;
  weight?: FontWeight;
}

export const Text = ({
  variant = 'body-md',
  color,
  weight,
  style,
  children,
  ...props
}: TextProps) => {
  const { theme } = useTheme();

  const variants = {
    'title-xxl': theme.typography.titles.xxl,
    'title-xl': theme.typography.titles.xl,
    'title-lg': theme.typography.titles.lg,
    'title-md': theme.typography.titles.md,
    'title-sm': theme.typography.titles.sm,
    'body-lg': theme.typography.body.lg,
    'body-md': theme.typography.body.md,
    'body-sm': theme.typography.body.sm,
    'body-xs': theme.typography.body.xs,
    'numeric-xxl': theme.typography.numeric.xxl,
    'numeric-xl': theme.typography.numeric.xl,
    'numeric-lg': theme.typography.numeric.lg,
    'numeric-md': theme.typography.numeric.md,
    'numeric-sm': theme.typography.numeric.sm,
    button: theme.typography.ui.button,
    label: theme.typography.ui.label,
    caption: theme.typography.ui.caption,
  };

  const fontWeights = {
    thin: theme.typography.families.poppins.thin,
    regular: theme.typography.families.poppins.regular,
    medium: theme.typography.families.poppins.medium,
    semiBold: theme.typography.families.poppins.semiBold,
    bold: theme.typography.families.poppins.bold,
    extraBold: theme.typography.families.poppins.extraBold,
    black: theme.typography.families.poppins.black,
  };

  return (
    <RNText
      {...props}
      style={[
        variants[variant],
        weight && { fontFamily: fontWeights[weight] },
        { color: color || theme.colors.text },
        style,
      ]}
    >
      {children}
    </RNText>
  );
};
