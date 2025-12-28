import React, {  } from 'react';
import { View, ViewProps, StyleSheet, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  FadeIn,
} from 'react-native-reanimated';
import { useTheme } from '../../contexts/ThemeContext';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedView = Animated.createAnimatedComponent(View);

interface CardProps extends ViewProps {
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  borderRadius?: 'sm' | 'md' | 'lg';
  elevated?: boolean;
  onPress?: () => void;
}

export const Card = ({
  padding = 'md',
  borderRadius = 'md',
  elevated = true,
  onPress,
  style,
  children,
  ...props
}: CardProps) => {
  const { theme, isDark } = useTheme();
  const scale = useSharedValue(1);
  const elevation = useSharedValue(elevated ? 4 : 0);

  const paddingValue = theme.spacing[padding];
  const borderRadiusValue = theme.sizes.borderRadius[borderRadius];

  const cardStyle = {
    padding: paddingValue,
    borderRadius: borderRadiusValue,
    backgroundColor: theme.colors.background,
    ...(elevated && {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isDark ? 0.3 : 0.1,
      shadowRadius: 8,
    }),
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      elevation: elevation.value,
    };
  });

  const handlePressIn = () => {
    if (onPress) {
      scale.value = withSpring(0.98, {
        damping: 15,
        stiffness: 150,
      });
      if (elevated) {
        elevation.value = withTiming(8, { duration: 100 });
      }
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      scale.value = withSpring(1, {
        damping: 15,
        stiffness: 150,
      });
      if (elevated) {
        elevation.value = withTiming(4, { duration: 100 });
      }
    }
  };

  const Wrapper = onPress ? AnimatedPressable : AnimatedView;

  return (
    <Wrapper
      entering={FadeIn.duration(400)}
      style={[styles.card, cardStyle, animatedStyle, style]}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}>
      {children}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  card: {
    overflow: 'hidden',
  },
});
