import React, { useEffect } from 'react';
import { ViewProps, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';

interface SkeletonProps extends ViewProps {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  variant?: 'rect' | 'circle' | 'text';
}

export const Skeleton = ({
  width = '100%',
  height = 20,
  borderRadius = 8,
  variant = 'rect',
  style,
  ...props
}: SkeletonProps) => {
  const {  isDark } = useTheme();
  const opacity = useSharedValue(0.3);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 800 }),
        withTiming(0.3, { duration: 800 })
      ),
      -1,
      false
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const getVariantStyles = () => {
    switch (variant) {
      case 'circle':
        return {
          width: height,
          height: height,
          borderRadius: height / 2,
        };
      case 'text':
        return {
          width,
          height: height * 0.7,
          borderRadius: 4,
        };
      default:
        return {
          width,
          height,
          borderRadius,
        };
    }
  };

  return (
    <Animated.View
      style={[
        styles.skeleton,
        {
          backgroundColor: isDark ? '#333' : '#E0E0E0',
        },
        getVariantStyles(),
        animatedStyle,
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    overflow: 'hidden',
  },
});
