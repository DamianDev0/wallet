import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  ActivityIndicator,
  View,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';
import { TextWeight } from '@type/text.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);


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
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

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

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    if (!isDisabled) {
      scale.value = withSpring(0.95, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(0.8, { duration: 100 });
    }
  };

  const handlePressOut = () => {
    if (!isDisabled) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      opacity.value = withTiming(1, { duration: 100 });
    }
  };

  return (
    <AnimatedPressable
      style={[
        styles.button,
        {
          height: sizeStyles[size].height,
          paddingHorizontal: sizeStyles[size].paddingHorizontal,
        },
        variantStyles[variant],
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        animatedStyle,
        style,
      ]}
      disabled={isDisabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
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
    </AnimatedPressable>
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
});
