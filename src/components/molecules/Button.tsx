import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  style,
  ...props
}: ButtonProps) => {
  const { theme, isDark } = useTheme();

  const sizeStyles = {
    sm: {
      height: 36,
      paddingHorizontal: theme.spacing.md,
      fontSize: theme.typography.sizes.sm,
    },
    md: {
      height: 48,
      paddingHorizontal: theme.spacing.lg,
      fontSize: theme.typography.sizes.md,
    },
    lg: {
      height: 56,
      paddingHorizontal: theme.spacing.xl,
      fontSize: theme.typography.sizes.lg,
    },
  };

  const variantStyles = {
    primary: {
      backgroundColor: theme.colors.primary,
      borderWidth: 0,
    },
    secondary: {
      backgroundColor: theme.colors.secondary,
      borderWidth: 0,
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    ghost: {
      backgroundColor: 'transparent',
      borderWidth: 0,
    },
  };

  const textColors = {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
    outline: theme.colors.primary,
    ghost: theme.colors.primary,
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
        },
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
      disabled={isDisabled}
      {...props}>
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            style={[
              styles.text,
              {
                color: textColors[variant],
                fontSize: sizeStyles[size].fontSize,
              },
            ]}
            weight="medium">
            {title}
          </Text>
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    textAlign: 'center',
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.8,
  },
});
