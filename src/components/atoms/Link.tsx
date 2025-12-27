import React from 'react';
import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from './Text';

interface LinkProps extends Omit<PressableProps, 'children'> {
  children: string;
  color?: string;
  variant?: 'body-sm' | 'body-md' | 'body-lg';
}

export const Link = ({
  children,
  color,
  variant = 'body-md',
  style,
  ...props
}: LinkProps) => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={(state) => {
        const resolved = typeof style === 'function' ? style(state) : style;
        return [styles.link, resolved];
      }}
      {...props}>
      {({ pressed }) => (
        <Text
          variant={variant}
          weight="medium"
          color={color || theme.colors.primary}
          style={pressed ? styles.textPressed : undefined}>
          {children}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  link: {
    alignSelf: 'flex-start',
  },
  textPressed: {
    opacity: 0.7,
  },
});
