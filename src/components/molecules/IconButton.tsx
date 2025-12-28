import React from 'react';
import { Pressable, PressableProps, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface IconButtonProps extends PressableProps {
  icon: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  rounded?: boolean;
}

export const IconButton = ({
  icon,
  variant = 'ghost',
  size = 'md',
  rounded = true,
  style,
  ...props
}: IconButtonProps) => {
  const { theme } = useTheme();

  const sizeStyles = {
    sm: { width: 32, height: 32 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
  };

  const variantStyles: Record<string, ViewStyle> = {
    primary: {
      backgroundColor: theme.colors.primary,
    },
    secondary: {
      backgroundColor: theme.colors.surface,
    },
    ghost: {
      backgroundColor: 'transparent',
    },
  };

  return (
    <Pressable
      style={({ pressed }) => {
        const resolvedStyle =
          typeof style === 'function' ? style({ pressed }) : style;
        return [
          styles.button,
          sizeStyles[size],
          variantStyles[variant],
          rounded && styles.rounded,
          pressed && styles.pressed,
          resolvedStyle,
        ];
      }}
      {...props}>
      {icon}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rounded: {
    borderRadius: 999,
  },
  pressed: {
    opacity: 0.7,
  },
});
