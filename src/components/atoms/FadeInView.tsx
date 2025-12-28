import React, {  } from 'react';
import { ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
  FadeInLeft,
  FadeInRight,
} from 'react-native-reanimated';

interface FadeInViewProps extends ViewProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
}

export const FadeInView = ({
  children,
  delay = 0,
  duration = 400,
  direction = 'none',
  distance = 20,
  style,
  ...props
}: FadeInViewProps) => {
  const getEnteringAnimation = () => {
    const config = { duration, delay };

    switch (direction) {
      case 'up':
        return FadeInUp.duration(duration).delay(delay).distance(distance);
      case 'down':
        return FadeInDown.duration(duration).delay(delay).distance(distance);
      case 'left':
        return FadeInLeft.duration(duration).delay(delay).distance(distance);
      case 'right':
        return FadeInRight.duration(duration).delay(delay).distance(distance);
      default:
        return FadeIn.duration(duration).delay(delay);
    }
  };

  return (
    <Animated.View
      entering={getEnteringAnimation()}
      style={style}
      {...props}
    >
      {children}
    </Animated.View>
  );
};
