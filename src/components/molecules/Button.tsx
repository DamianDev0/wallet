import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
  ViewStyle,
} from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

type TextWeight =
  | 'thin'
  | 'regular'
  | 'medium'
  | 'semiBold'
  | 'bold'
  | 'extraBold'
  | 'black';

interface ButtonProps extends Omit<PressableProps, 'children'> {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  textWeight?: TextWeight;
}

export const Button = ({
  title,
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  disabled,
  textWeight = 'semiBold',
  style,
  ...props
}: ButtonProps) => {
  const { theme } = useTheme();

  const sizeStyles = {
    sm: {
      height: 36,
      paddingHorizontal: theme.spacing.md,
      textVariant: 'body-sm' as const,
    },
    md: {
      height: 48,
      paddingHorizontal: theme.spacing.lg,
      textVariant: 'button' as const,
    },
    lg: {
      height: 56,
      paddingHorizontal: theme.spacing.xl,
      textVariant: 'body-lg' as const,
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
    primary: theme.colors.primaryText,
    secondary: theme.colors.secondaryText,
    outline: theme.colors.primary,
    ghost: theme.colors.primary,
  };

  const isDisabled = disabled || loading;

  return (
    <Pressable
      style={({ pressed }) => {
        const baseStyle = [
          styles.button,
          {
            height: sizeStyles[size].height,
            paddingHorizontal: sizeStyles[size].paddingHorizontal,
          },
          variantStyles[variant],
          fullWidth && styles.fullWidth,
          isDisabled && styles.disabled,
          pressed && !isDisabled && styles.pressed,
        ].filter(Boolean) as ViewStyle[];

        return [baseStyle, style] as any;
      }}
      disabled={isDisabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color={textColors[variant]} />
      ) : (
        <View style={styles.content}>
          {icon && <View style={styles.icon}>{icon}</View>}
          <Text
            variant={sizeStyles[size].textVariant}
            weight={textWeight}
            color={textColors[variant]}
            style={styles.text}
          >
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
