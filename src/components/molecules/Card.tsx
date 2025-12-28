import React from 'react';
import { View, ViewProps, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

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
      elevation: 4,
    }),
  };

  const Wrapper = onPress ? Pressable : View;

  return (
    <Wrapper
      style={[styles.card, cardStyle, style]}
      onPress={onPress}
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
