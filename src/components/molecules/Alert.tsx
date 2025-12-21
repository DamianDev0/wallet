import React from 'react';
import { View, ViewProps, StyleSheet } from 'react-native';
import { useTheme } from '../../contexts/ThemeContext';
import { Text } from '../atoms/Text';

interface AlertProps extends ViewProps {
  type?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  message: string;
  icon?: React.ReactNode;
}

export const Alert = ({
  type = 'info',
  title,
  message,
  icon,
  style,
  ...props
}: AlertProps) => {
  const { theme, isDark } = useTheme();

  const typeColors = {
    info: {
      background: isDark ? '#0A84FF20' : '#0A84FF15',
      border: theme.colors.primary,
      text: theme.colors.primary,
    },
    success: {
      background: isDark ? '#34C75920' : '#34C75915',
      border: theme.colors.success,
      text: theme.colors.success,
    },
    warning: {
      background: isDark ? '#FF9F0A20' : '#FF9F0A15',
      border: theme.colors.secondary,
      text: theme.colors.secondary,
    },
    danger: {
      background: isDark ? '#FF3B3020' : '#FF3B3015',
      border: theme.colors.danger,
      text: theme.colors.danger,
    },
  };

  const colors = typeColors[type];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
        },
        style,
      ]}
      {...props}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <View style={styles.content}>
        {title && (
          <Text
            variant="body"
            weight="bold"
            style={[styles.title, { color: colors.text }]}>
            {title}
          </Text>
        )}
        <Text variant="caption" style={{ color: theme.colors.text }}>
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'flex-start',
  },
  icon: {
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
});
