import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';

interface ContainerProps extends ViewProps {
  padding?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  background?: string;
}

export const Container = ({
  padding = 'md',
  background,
  style,
  children,
  ...props
}: ContainerProps) => {
  const { theme } = useTheme();

  const paddingValue = theme.spacing[padding];
  const backgroundColor = background || theme.colors.background;

  return (
    <View
      style={[
        styles.container,
        { padding: paddingValue, backgroundColor },
        style,
      ]}
      {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
