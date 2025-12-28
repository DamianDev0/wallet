import React, { useState, useEffect } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  StyleSheet,
  Pressable,
  DimensionValue,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  withSequence,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

const AnimatedView = Animated.createAnimatedComponent(View);

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  width?: DimensionValue;
  height?: number;
  placeholderSize?: number;
}

export const Input = ({
  label,
  error,
  leftIcon,
  rightIcon,
  onRightIconPress,
  style,
  width = '100%',
  height = 48,
  placeholderSize,
  ...props
}: InputProps) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(1);
  const shake = useSharedValue(0);

  let borderColor = 'transparent';
  if (error) {
    borderColor = theme.colors.danger;
  } else if (isFocused) {
    borderColor = theme.colors.primary;
  }

  useEffect(() => {
    if (error) {
      shake.value = withSequence(
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(-5, { duration: 50 }),
        withTiming(5, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    }
  }, [error]);

  const handleFocus = () => {
    setIsFocused(true);
    scale.value = withSpring(1.02, {
      damping: 15,
      stiffness: 150,
    });
    borderWidth.value = withTiming(2, { duration: 200 });
  };

  const handleBlur = () => {
    setIsFocused(false);
    scale.value = withSpring(1, {
      damping: 15,
      stiffness: 150,
    });
    borderWidth.value = withTiming(1, { duration: 200 });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }, { translateX: shake.value }],
      borderWidth: borderWidth.value,
    };
  });

  return (
    <View style={[styles.container, { width }]}>
      {label && (
        <Text variant="caption" weight="medium" style={styles.label}>
          {label}
        </Text>
      )}
      <AnimatedView
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.colors.surface,
            borderColor: borderColor,
            height,
          },
          animatedStyle,
        ]}>
        {leftIcon && <View style={styles.leftIcon}>{leftIcon}</View>}
        <TextInput
          style={[
            styles.input,
            {
              color: theme.colors.text,
              fontFamily: theme.typography.families.poppins.regular,
              fontSize: placeholderSize || theme.typography.sizes.base,
            },
            leftIcon ? styles.inputWithLeftIcon : undefined,
            rightIcon ? styles.inputWithRightIcon : undefined,
            style,
          ]}
          placeholderTextColor={theme.colors.textSecondary}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {rightIcon && (
          <Pressable
            onPress={onRightIconPress}
            style={styles.rightIcon}
            disabled={!onRightIconPress}>
            {rightIcon}
          </Pressable>
        )}
      </AnimatedView>
      {error && (
        <Text variant="caption" style={[styles.errorText, { color: theme.colors.danger }]}>
          {error}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  label: {
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
  },
  inputWithLeftIcon: {
    marginLeft: 8,
  },
  inputWithRightIcon: {
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 4,
  },
  rightIcon: {
    marginLeft: 4,
  },
  errorText: {
    position: 'absolute',
    bottom: -18,
    left: 0,
  },
});
