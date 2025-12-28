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
  const { theme } = useTheme();

  const typeColors = {
    info: {
      background: theme.colors.infoBackground,
      border: theme.colors.info,
      text: theme.colors.info,
    },
    success: {
      background: theme.colors.successBackground,
      border: theme.colors.success,
      text: theme.colors.success,
    },
    warning: {
      background: theme.colors.warningBackground,
      border: theme.colors.secondary,
      text: theme.colors.secondary,
    },
    danger: {
      background: theme.colors.dangerBackground,
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
            variant="body-md"
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
